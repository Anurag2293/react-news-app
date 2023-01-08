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

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        console.log('Hello I am a constructor from News component.');
        this.state = {
            articles: [],
            page : 1,
            loading: false,
            totalResults: 10
        }
        document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey`;
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e61f3019056144aba987bd83f4b3cd06&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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

    async componentDidMount() {
        await this.updateNews();
    }

    handleNextClick = async () => {
        await this.setState({page : this.state.page + 1});
        await this.updateNews();
    }

    handlePrevClick = async () => {
        await this.setState({page : this.state.page - 1});
        await this.updateNews();
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className="text-center" style={{margin : '40px 0px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
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
                    <p>{this.state.page}/{Math.ceil(this.state.totalResults/this.props.pageSize)}</p>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}