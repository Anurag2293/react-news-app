import React, { Component } from 'react';
import PropTypes from 'prop-types'
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export default class News extends Component {
    static defaultProps = {
        country : 'in',
        pageSize : 8,
        category : 'general'
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }

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
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e61f3019056144aba987bd83f4b3cd06&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        const data = await fetch(url);
        const parsedData = await data.json();
        console.log(parsedData);

        this.setState({
            articles : parsedData.articles,
            totalResults : parsedData.totalResults,
            loading : false
        })
    }

    handleNextClick = async () => {
        console.log('Next')

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e61f3019056144aba987bd83f4b3cd06&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        const data = await fetch(url);
        const parsedData = await data.json();
        console.log(parsedData);

        this.setState({
            articles : parsedData.articles,
            page : this.state.page + 1,
            loading : false
        })
    }

    handlePrevClick = async () => {
        console.log('Previous');

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e61f3019056144aba987bd83f4b3cd06&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        const data = await fetch(url);
        const parsedData = await data.json();

        this.setState({
            articles : parsedData.articles,
            page : this.state.page - 1,
            loading : false
        })
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className="text-center" style={{margin : '40px 0px'}}>NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return  <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}