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

create TABLE massages(
    id SERIAL PRIMARY KEY,
	sender_id INTEGER,
	getter_id INTEGER,
    messagetext VARCHAR(1000),
    senddate DATE,
	FOREIGN KEY (sender_id) REFERENCES users (id),
	FOREIGN KEY (getter_id) REFERENCES users (id)
);

create TABLE file_data(
    id SERIAL PRIMARY KEY,
	owner_id INTEGER,
	data_type VARCHAR(255),
    file_name VARCHAR(255),
	file_description VARCHAR(1000),
    upload_date DATE,
	file_url VARCHAR(255),
	preview_url VARCHAR(255),
	FOREIGN KEY (owner_id) REFERENCES users (id)
);