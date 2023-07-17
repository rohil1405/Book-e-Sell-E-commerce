import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: "center", marginBottom: 50 }}>Posts</h1>
            {posts.map(post => (
                <div key={post.id} style={{ marginLeft: 15 }}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}

export default Posts;
