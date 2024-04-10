const BASE_URL = 'http://localhost:3000/api';
let currentPage = 1;
let perPage = 20;
let magType = '';

function getFeatures() {
  fetch(`${BASE_URL}/features?mag_type=${magType}&page=${currentPage}&per_page=${perPage}`)
    .then(response => response.json())
    .then(data => {
      const featuresContainer = document.getElementById('features');
      featuresContainer.innerHTML = '';
      data.data.forEach(feature => {
        const featureElement = document.createElement('div');
        featureElement.className = 'col';
        featureElement.innerHTML = `
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${feature.attributes.title}</h5>
              <p class="card-text">${feature.attributes.place}</p>
              <div id="comments-${feature.id}"></div>
              <form id="commentForm-${feature.id}">
                <div class="mb-3">
                  <label for="commentBody" class="form-label">New Comment</label>
                  <input type="text" class="form-control" id="commentBody-${feature.id}">
                </div>
                <button type="submit" class="btn btn-primary">Submit Comment</button>
              </form>
            </div>
          </div>
        `;
        featuresContainer.appendChild(featureElement);
        document.getElementById(`commentForm-${feature.id}`).addEventListener('submit', function(event) {
          createComment(event, feature.id);
        });
        feature.comments.forEach(comment => {
          addCommentToFeature(comment, feature.id);
        });
      });
      document.getElementById('currentPage').textContent = currentPage;
    });
}
function createComment(event, featureId) {
  event.preventDefault();
  const commentBody = document.getElementById(`commentBody-${featureId}`).value;
  fetch(`${BASE_URL}/features/${featureId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment: { body: commentBody } })
  })
    .then(response => response.json())
    .then(comment => {
      addCommentToFeature(comment, featureId);
      document.getElementById(`commentBody-${featureId}`).value = '';
    });
}
function addCommentToFeature(comment, featureId) {
  const commentsContainer = document.getElementById(`comments-${featureId}`);
  const commentElement = document.createElement('p');
  commentElement.className = 'text-muted';
  commentElement.innerHTML = `<small>${comment.body}</small>`;
  commentsContainer.appendChild(commentElement);
}
getFeatures();

document.getElementById('filterForm').addEventListener('submit', function(event) {
  event.preventDefault();
  magType = document.getElementById('magType').value;
  perPage = document.getElementById('perPage').value;
  getFeatures();
});
document.getElementById('prevPage').addEventListener('click', function(event) {
  event.preventDefault();
  if (currentPage > 1) {
    currentPage--;
    getFeatures();
  }
});
document.getElementById('nextPage').addEventListener('click', function(event) {
  event.preventDefault();
  currentPage++;
  getFeatures();
});
