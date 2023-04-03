import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
export class News extends Component {
    static defautProps = {
        country: "in",
        apiKey: "9abe5b938dc848e0b51815f67816cb57",
        pageSize: 20,
        language: "en"
    }
    static propTypes = {
        country: PropTypes.string,
        apiKey: PropTypes.string,
        pageSize: PropTypes.number,
        language: PropTypes.string
    }
    articles = []
    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            loading: true,
            page: 1
        }
        document.title = this.capitalize(this.props.category) + " - NewsMonkey";
    }
    async updateNews() {
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&language=${this.props.language}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }
    capitalize = (word) => {
        let lower = word.toLowerCase();
        return lower[0].toUpperCase() + lower.slice(1);
    }
    async componentDidMount() {
        this.updateNews();
    }
    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&language=${this.props.language}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        });
    }
    render() {
        return (
            <>
                <h3 className='text-center my-3' style={{ color: "#867A6D", textDecoration: "underline" }}>News Monkey-Top {this.capitalize(this.props.category)} Headlines</h3>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className='container my-3'>
                        {this.state.loading && <Spinner />}
                        {/* {!this.state.loading && */}
                        {<div className="row my-3">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 my-3" key={element.url}>
                                    <NewsItem title={element.title.slice(0, 45) + "..."} description={element.description?.slice(0, 88).concat("...")} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                                </div>
                            })}
                        </div>
                        }
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between mb-4">
                    <button disabled={this.state.page === 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News