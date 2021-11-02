create TABLE users(
    id SERIAL PRIMARY KEY,
    userName VARCHAR(255),
    country VARCHAR(255),
    friends BOOLEAN,
    userStatus VARCHAR(255),
    img VARCHAR(255)
);

create TABLE posts(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    postText VARCHAR(255),
    likeCount INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
);