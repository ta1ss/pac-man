package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"sync"
	"text/template"
)

type Score struct {
	Rank  int    `json:"rank"`
	Name  string `json:"name"`
	Score int    `json:"score"`
	Time  string `json:"time"`
}

var scoresMutex sync.Mutex

func main() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/get-scores", handleGetScores)
	http.HandleFunc("/post-score", handlePostScore)

	fs := http.FileServer(http.Dir("./static/"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	fs2 := http.FileServer(http.Dir("./src/"))
	http.Handle("/src/", http.StripPrefix("/src/", fs2))
	fs3 := http.FileServer(http.Dir("./media/"))
	http.Handle("/media/", http.StripPrefix("/media/", fs3))
	fs4 := http.FileServer(http.Dir("./sounds/"))
	http.Handle("/sounds/", http.StripPrefix("/sounds/", fs4))

	fmt.Println("http://localhost:8080/")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handler(w http.ResponseWriter, r *http.Request) {
	template := template.Must(template.ParseFiles("static/index.html"))
	if r.URL.Path != "/" {
		http.Error(w, "404 - not found", http.StatusNotFound)
		return
	}
	if r.Method != "GET" {
		fmt.Fprintln(w, "error: method not suported")
		return
	} else {
		template.Execute(w, nil)
	}
}

func handleGetScores(w http.ResponseWriter, r *http.Request) {
	scores, err := readScores()
	if err != nil {
		http.Error(w, "Error reading scores", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(scores)
}

func handlePostScore(w http.ResponseWriter, r *http.Request) {
	scores, err := readScores()
	if err != nil {
		http.Error(w, "Error reading scores", http.StatusInternalServerError)
		return
	}

	var newScore Score
	json.NewDecoder(r.Body).Decode(&newScore)
	scores = append(scores, newScore)

	err = writeScores(scores)
	if err != nil {
		http.Error(w, "Error writing scores", http.StatusInternalServerError)
		return
	}

	sortScores()
}

// Path: scores.json, this is the file that will be read and written to, sort the scores and add the rank
func sortScores() {
	file, err := ioutil.ReadFile("scores.json")
	if err != nil {
		fmt.Println(err)
	}
	var scores []Score
	json.Unmarshal(file, &scores)
	for i := 0; i < len(scores); i++ {
		for j := 0; j < len(scores); j++ {
			if scores[i].Score > scores[j].Score {
				scores[i], scores[j] = scores[j], scores[i]
			}
		}
	}
	for i := 0; i < len(scores); i++ {
		scores[i].Rank = i + 1
	}
	jsonScores, err := json.Marshal(scores)
	if err != nil {
		fmt.Println(err)
	}
	err = ioutil.WriteFile("scores.json", jsonScores, 0644)
	if err != nil {
		fmt.Println(err)
	}
}

func readScores() ([]Score, error) {
	scoresMutex.Lock()
	defer scoresMutex.Unlock()

	file, err := ioutil.ReadFile("scores.json")
	if err != nil {
		return nil, err
	}
	var scores []Score
	json.Unmarshal(file, &scores)

	return scores, nil
}

func writeScores(scores []Score) error {
	scoresMutex.Lock()
	defer scoresMutex.Unlock()

	jsonScores, err := json.Marshal(scores)
	if err != nil {
		return err
	}
	err = ioutil.WriteFile("scores.json", jsonScores, 0644)
	if err != nil {
		return err
	}

	return nil
}
