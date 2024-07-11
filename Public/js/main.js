const output = document.querySelector('#output');
const button = document.querySelector('#getPosts');

async function showPosts() {
    try {
        const res = await fetch('http://localhost:6060/api/v1/');
        if (!res.ok) {
            throw new Error('Failed to fetch posts');
        }

        const posts = await res.json(); // Parse response as JSON
        console.log(posts)

        output.innerHTML = posts.message

        
    } catch (error) {
        console.error('Error:', error);
        output.textContent = 'Failed to load posts';
    }
}

button.addEventListener('click', showPosts);
