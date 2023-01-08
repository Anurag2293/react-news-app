import React from 'react';
import PropTypes from 'prop-types'

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, date, author, source } = props;

    return (
        <div className='my-3'>
            <div className="card">
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: '0'
                }}><span className="badge rounded-pill bg-danger">{source}</span></div>
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    );
}

NewsItem.defaultProps = {
    imageUrl: 'https://images.hindustantimes.com/tech/img/2023/01/05/960x540/Samsung_Galaxy_A14_5G_1672889924525_1672889938166_1672889938166.jpg'
}

NewsItem.propTypes = {
    title : PropTypes.string
}

export default NewsItem