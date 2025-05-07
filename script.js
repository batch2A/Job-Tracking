document.addEventListener('DOMContentLoaded', () => {
    const addJobForm = document.getElementById('addJobForm');
    const jobsList = document.getElementById('jobs');
  
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
  
    const saveJobs = () => {
      localStorage.setItem('jobs', JSON.stringify(jobs));
    };
  
    const renderJobs = () => {
      jobsList.innerHTML = '';
      jobs.forEach((job, index) => {
        const li = document.createElement('li');
        li.className = 'job-item';
        li.innerHTML = `
          <strong>${job.position}</strong> at ${job.company}<br/>
          Applied on: ${job.appliedDate}<br/>
          Status: ${job.status}
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        jobsList.appendChild(li);
      });
    };
  
    addJobForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const company = document.getElementById('company').value;
      const position = document.getElementById('position').value;
      const appliedDate = document.getElementById('appliedDate').value;
      const status = document.getElementById('status').value;
  
      jobs.push({ company, position, appliedDate, status });
      saveJobs();
      renderJobs();
      addJobForm.reset();
    });
  
    jobsList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        jobs.splice(index, 1);
        saveJobs();
        renderJobs();
      }
    });
  
    renderJobs();
  });
  