module.exports = {
    $group: {
        _id: "$title",
        videoId: { $first: "$video_id" },
        description: { $first: "$description" },
        categoryId: { $first: "$category_id" },
        trendingDate: { $first: "$trending_date" },
        thumbnail: { $first: "$thumbnail_link" },
        liked: { $first: "$like" },
        likes: { $sum: "$likes" },
        dislikes: { $sum: "$dislikes" },
        comments: { $sum: "$comment_count" },
        views: { $sum: "$views" },
    },
};
