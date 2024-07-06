const output = document.querySelector('#output');
const button = document.querySelector('#getPosts');

async function showPosts() {
    try {
        const res = await fetch('http://localhost:6060/');
        if (!res.ok) {
            throw new Error('Failed to fetch posts');
        }

        const posts =  res; // Parse response as JSON
        console.log(posts)

        // output.innerHTML = '';

        // posts.forEach(post => {
        //     const postEl = document.createElement('div');
        //     postEl.textContent = `ID: ${post.id}, Title: ${post.title}`;
        //     output.appendChild(postEl);
        // });
    } catch (error) {
        console.error('Error:', error);
        output.textContent = 'Failed to load posts';
    }
}

button.addEventListener('click', showPosts);
