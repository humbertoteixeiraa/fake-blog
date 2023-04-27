
//FUNCTIONS
async function readPosts () {
    let postArea = document.querySelector('.posts');
    postArea.innerHTML = 'Loading ...'

    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();

    if (json.length > 0) {
        postArea.innerHTML = '';

        for(let i in json) {
            let postHTML = `
            <div>
                <h2>${json[i].title}</h2>
                ${json[i].body}
                <hr/>
            </div>
            `;
            postArea.innerHTML += postHTML;
        }
    } else {
        postArea.innerHTML = 'There are no posts to display!';
    }
}

async function addNewPost(title, body) {
    await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 2
            })
        }
    );

    document.querySelector('#titleField').value = '';
    document.querySelector('#bodyField').value = '';

    readPosts();
}

function insertPosts() {
    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;

    if (title && body) {
        addNewPost(title, body);
    } else {
        alert('ATTENTION: Fill in all fields!');
    }
}



//ACTIONS
readPosts();

document.querySelector('#insertButton').addEventListener('click', insertPosts);

