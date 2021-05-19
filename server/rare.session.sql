INSERT INTO rare_rest_api_post (
    id,
    title,
    publication_date,
    image_url,
    content,
    approved,
    category_id,
    user_id
  )
VALUES (
    id:integer,
    'title:varchar(50)',
    'publication_date:datetime',
    'image_url:varchar(100)',
    'content:text',
    approved:bool,
    'category_id:bigint',
    'user_id:bigint'
  );