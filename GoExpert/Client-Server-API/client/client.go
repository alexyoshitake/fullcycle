package main

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

func main() {
	ctx := context.Background()
	ctx, cancel := context.WithTimeout(ctx, 300*time.Millisecond)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, "GET", "http://localhost:8080/cotacao", nil)
	if err != nil {
		panic(err)
	}

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()

	valor, err := io.ReadAll(res.Body)
	if err != nil {
		panic(err)
	}

	escreverNoArquivo(string(valor))
}

func escreverNoArquivo(valor string) {
	file, err := os.Create("cotacao.txt")
	if err != nil {
		panic(err)
	}

	_, err = fmt.Fprintf(file, "Dólar: %s\n", valor)
	if err != nil {
		panic(err)
	}

	fmt.Println("Arquivo criado com sucesso!")
}
