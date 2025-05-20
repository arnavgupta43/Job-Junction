/* js/app.js */
const API_BASE = "/api/v1";

window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const token = localStorage.getItem("token");
  const authLink = document.getElementById("auth-link");
  if (authLink) authLink.textContent = token ? "My Jobs" : "Login";

  if (path.endsWith("jobs.html")) {
    if (!token) return (window.location.href = "login.html");
    initJobsPage(token);
  } else if (path.endsWith("login.html")) {
    initLoginPage();
  } else if (path.endsWith("register.html")) {
    initRegisterPage();
  }
});

function initLoginPage() {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "jobs.html";
      } else alert(data.msg || data.error);
    } catch (err) {
      console.error(err);
    }
  });
}

function initRegisterPage() {
  document
    .getElementById("registerForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      try {
        const res = await fetch(`${API_BASE}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("token", data.token);
          window.location.href = "jobs.html";
        } else alert(data.msg || data.error);
      } catch (err) {
        console.error(err);
      }
    });
}

async function initJobsPage(token) {
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });

  const form = document.getElementById("createJobForm");
  const list = document.getElementById("jobsList");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const company = form.company.value;
    const position = form.position.value;
    const status = form.status.value;
    await fetch(`${API_BASE}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ company, position, status }),
    });
    form.reset();
    loadJobs();
  });

  async function loadJobs() {
    list.innerHTML = "";
    const res = await fetch(`${API_BASE}/jobs`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    data.jobs.forEach((job) => {
      const li = document.createElement("li");
      li.className = "job-item";

      const span = document.createElement("span");
      span.textContent = `${job.company} - ${job.position} [${job.status}]`;

      const btnContainer = document.createElement("div");
      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️";
      editBtn.className = "btn edit-btn";
      editBtn.dataset.id = job._id;
      editBtn.dataset.company = job.company;
      editBtn.dataset.position = job.position;
      editBtn.dataset.status = job.status;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.className = "btn delete-btn";
      deleteBtn.dataset.id = job._id;

      btnContainer.append(editBtn, deleteBtn);
      li.append(span, btnContainer);
      list.appendChild(li);
    });

    list.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        editJob(
          btn.dataset.id,
          btn.dataset.company,
          btn.dataset.position,
          btn.dataset.status
        );
      });
    });

    list.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        deleteJob(btn.dataset.id);
      });
    });
  }

  window.editJob = async (id, company, position, status) => {
    const newCompany = prompt("Company:", company);
    const newPosition = prompt("Position:", position);
    const newStatus = prompt("Status (pending/interview/declined):", status);
    if (newCompany && newPosition && newStatus) {
      await fetch(`${API_BASE}/jobs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company: newCompany,
          position: newPosition,
          status: newStatus,
        }),
      });
      loadJobs();
    }
  };

  window.deleteJob = async (id) => {
    if (confirm("Delete this job?")) {
      await fetch(`${API_BASE}/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      loadJobs();
    }
  };

  loadJobs();
}
