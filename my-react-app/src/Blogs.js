import React from 'react';

import './Blogs.css'; // Import the CSS for Blogs

const Blogs = () => {

    const blogPosts = [
        {
            id: 1,
            title: "Revitalizing Facial at Ruiru Beauty Parlour",
            content: "I recently visited Ruiru Beauty Parlour for a facial and I was blown away by the results. The esthetician was fantastic!",
            author: "Max Maxwell",
            date: "May 21, 2024"
        },
        {
            id: 2,
            title: "Amazing Haircut and Color at Ruiru Beauty Parlour",
            content: "I have been going to Ruiru Beauty Parlour for years and I have never been disappointed. The stylists are top-notch!",
            author: "John Doe",
            date: "May 21, 2024"
        },
        {
            id: 3,
            title: "Perfect Eyebrow Shaping at Ruiru Beauty Parlour",
            content: "I have been getting my eyebrows shaped at Ruiru Beauty Parlour for years and I have never been better!",
            author: "Marion Wanyonyi",
            date: "May 21, 2024"
        },
        {
            id: 4,
            title: "Beautiful Nail Art at Ruiru Beauty Parlour",
            content: "I recently visited Ruiru Beauty Parlour for a manicure and I was blown away by the beautiful nail art.",
            author: "Ruby Mwaia",
            date: "May 21, 2024"
        }
    ];

    return (
        <div>
            <h1>Blogs</h1>
            {blogPosts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p><strong>{post.author}</strong> - {post.date}</p>
                </div>
            ))}
        </div>
    );
};

export default Blogs;
