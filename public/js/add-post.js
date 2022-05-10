// add a function to correspond to the add-post form
//get the values in add-post
const title = document.querySelector('input[name="post-title"]').value;
const content = document.querySelector('textarea[name="content"]').value;


async function newFormHandler(event) {
  event.preventDefault();

  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#add-post-form').addEventListener('submit', newFormHandler);

