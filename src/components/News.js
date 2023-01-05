import React, { Component } from 'react';
import NewsItem from './NewsItem';

export default class News extends Component {

    constructor() {
        super();
        console.log('Hello I am a constructor from News component.');
        this.state = {
            articles: [],
            page : 1,
            loading: false
        }
    }

    async componentDidMount() {
        const url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=e61f3019056144aba987bd83f4b3cd06&page=1&pageSize=20';
        const data = await fetch(url);
        const parsedData = await data.json();
        console.log(parsedData);

        this.setState({
            articles : parsedData.articles,
            totalResults : parsedData.totalResults
        })
    }

    handleNextClick = async () => {
        console.log('Next')

        if (this.state.page + 1 > Math.ceil(this.state.totalResults/20)) {
            return;
        }

        const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e61f3019056144aba987bd83f4b3cd06&page=${this.state.page+1}&pageSize=20`;
        const data = await fetch(url);
        const parsedData = await data.json();
        console.log(parsedData);

        this.setState({
            articles : parsedData.articles,
            page : this.state.page + 1
        })
    }

    handlePrevClick = async () => {
        console.log('Previous');

        const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e61f3019056144aba987bd83f4b3cd06&page=${this.state.page-1}&pageSize=20`;
        const data = await fetch(url);
        const parsedData = await data.json();
        console.log(parsedData);

        this.setState({
            articles : parsedData.articles,
            page : this.state.page - 1
        })
    }

    render() {
        return (
            <div className='container my-3'>
                <h2>NewsMonkey - Top Headlines</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title.slice(0, 45) : ""} description={element.description?element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}