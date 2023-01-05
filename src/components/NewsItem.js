import React, { Component } from 'react';

export default class NewsItem extends Component {
    
    render() {
        let {title, description, imageUrl, newsUrl} = this.props;
        return (
            <div className='my-3'>
                <div className="card" style={{width: '18rem'}}>
                    <img src={!imageUrl?'https://tech.hindustantimes.com/mobile/news/samsung-upgrades-selfie-camera-and-screen-on-200-phone-71672859226346.html':imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}...</p>
                            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        );
    }
}

// e61f3019056144aba987bd83f4b3cd06