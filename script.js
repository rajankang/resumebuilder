  let isResizing = false;

    function switchTab(tab) {
        document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
        document.querySelector('.' + tab).classList.add('active');
        document.querySelectorAll('.code').forEach(el => el.style.display = 'none');
        document.getElementById(tab).style.display = 'block';
        document.querySelectorAll('.copy-buttons button').forEach(button => {
            if (button.textContent.includes('CSS') && tab === 'css') {
                button.style.display = 'inline-block';
            } else if (button.textContent.includes('HTML') && tab === 'html') {
                button.style.display = 'inline-block';
            } else {
                button.style.display = 'none';
            } })
    
    }

    function updatePreview() {
        const html = document.getElementById('html').value;
        const css = "<style>" + document.getElementById('css').value + "</style>";
        const iframe = document.getElementById('preview');
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html + css);
    iframe.contentWindow.document.close();
}

document.getElementById('html').addEventListener('input', updatePreview);
document.getElementById('css').addEventListener('input', updatePreview);

function startResizing(e) {
    e.preventDefault();
    isResizing = true;
    document.addEventListener('mousemove', resize, false);
    document.addEventListener('mouseup', stopResizing, false);
}

function resize(e) {
    if (!isResizing) return;
    const container = document.querySelector('.container');
    const editor = document.querySelector('.editor');
    const preview = document.querySelector('.preview');
    const resizer = document.querySelector('.resizer');
    const containerRect = container.getBoundingClientRect();
    const newWidth = e.clientX - containerRect.left;

    if (newWidth > 100 && newWidth < (containerRect.width - 100)) {
        editor.style.width = `${newWidth}px`;
        preview.style.width = `${containerRect.width - newWidth - resizer.offsetWidth}px`;
    }
}

function stopResizing() {
    isResizing = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResizing);
}

function exportCode() {
    var zip = new JSZip();
    zip.file("index.html", document.getElementById('html').value);
    zip.file("style.css", document.getElementById('css').value);

    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, "mywebsite.zip");
    });
}

function clearCode() {
    document.getElementById('html').value = '';
    document.getElementById('css').value = '';
    updatePreview();
}

function openLink(url) {
    window.open(url, '_blank');
}

function loadTemplate(templateName) {
    let htmlContent = '';
    let cssContent = '';

    switch (templateName) {
        case 'template1':
            htmlContent = `<link rel="stylesheet" href="style.css">
<div class="resume-container">
<header class="resume-header">
    <img src="https://images.pexels.com/photos/14440674/pexels-photo-14440674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Profile Picture" class="profile-img">
    <h1>Student Name</h1>
    <p>High School Student | AI Program Participant</p>
</header>
<section class="resume-section">
    <h2>About Me</h2>
    <p>I am an enthusiastic high school student deeply interested in artificial intelligence and machine learning. I am keen on applying my skills in real-world projects and furthering my knowledge through continuous learning.</p>
</section>
<section class="resume-section">
    <h2>Skills</h2>
    <ul class="skills-list">
        <li>Proficient in Python and JavaScript</li>
        <li>Understanding of AI and ML fundamentals</li>
        <li>Experience with TensorFlow and PyTorch</li>
    </ul>
</section>
<section class="resume-section">
    <h2>Projects</h2>
    <ul>
        <li>AI Chatbot for Education - A chatbot designed to help students with their queries.</li>
        <li>Data Analysis on Student Performance - Utilizing ML algorithms to predict student success.</li>
    </ul>
</section>
<footer class="resume-footer">Powered by Work ED</footer>
</div>
            `;
            cssContent = `
.resume-container {
    font-family: 'Arial', sans-serif;
    color: #333;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    max-width: 800px;
    margin: auto;
            }
.profile-img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    margin: 20px auto 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
.resume-header h1, .resume-header p {
    text-align: center;
    margin: 0;
            }
.resume-header h1 {
    color: #2EA363;
    margin-bottom: 5px;
            }
.resume-header p {
                font-style: italic;
                color: #666;
            }
.resume-section {
    margin-top: 20px;
            }
.resume-section h2 {
    color: #333;
    border-bottom: 2px solid #2EA363;
    padding-bottom: 5px;
            }
.skills-list, .resume-section ul {
    list-style-type: none;
    padding: 0;
            }
.skills-list li, .resume-section ul li {
    background-color: #f9f9f9;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            }
.resume-footer {
    text-align: center;
    font-size: 0.8em;
    margin-top: 30px;
    color: #666;
    padding-top: 10px;
    border-top: 1px solid #eee;
            }`;
            break;
        case 'template2':
            htmlContent = `<link rel="stylesheet" href="style.css">
<div class="resume-container-dark">
    <header class="resume-header-dark">
        <img src="https://images.pexels.com/photos/14440674/pexels-photo-14440674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Profile Picture" class="profile-img-dark">
        <h1>Student Name</h1>
        <p>High School Student | AI Program Participant</p>
    </header>
    <section class="resume-section-dark">
        <h2>Skills & Interests</h2>
        <p>Specialized in Python, Data Analysis, Machine Learning algorithms, and passionate about solving real-world problems through AI.</p>
    </section>
    <section class="resume-section-dark">
        <h2>Notable Projects</h2>
        <ul>
            <li>Smart Weather Predictor using ML</li>
            <li>Emotion Recognition with Deep Learning</li>
        </ul>
    </section>
    <footer class="resume-footer-dark">Powered by Work ED</footer>
</div>
`;
            cssContent = `
.resume-container-dark {
    font-family: 'Arial', sans-serif;
    color: #eee;
    background-color: #333;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    max-width: 800px;
    margin: auto;
}
.profile-img-dark {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    margin: 20px auto 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.resume-header-dark h1, .resume-header-dark p {
    text-align: center;
    margin: 0;
}
.resume-header-dark h1 {
    color: #2EA363;
    margin-bottom: 5px;
}
.resume-header-dark p {
    font-style: italic;
    color: #aaa;
}
.resume-section-dark, .resume-footer-dark {
    background-color: #222;
    padding: 15px;
    border-radius: 5px;
    margin-top: 20px;
}
.resume-section-dark h2, .resume-footer-dark {
    color: #2EA363;
}
.resume-section-dark ul {
    list-style: none;
    padding: 0;
}
.resume-section-dark ul li {
    background-color: #2EA363;
    color: #333;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
}
.resume-footer-dark {
    text-align: center;
    font-size: 0.8em;
    color: #666;
}`;
            break;
        case 'template3':
            htmlContent = `<link rel="stylesheet" href="style.css">
<div class="resume-container-vibrant">
    <header class="resume-header-vibrant">
        <img src="https://images.pexels.com/photos/14440674/pexels-photo-14440674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Profile Picture" class="profile-img-vibrant">
        <h1>Student Name</h1>
        <p>AI Enthusiast | High School Innovator</p>
    </header>
    <section class="resume-section-vibrant">
        <h2>Educational Achievements</h2>
        <p>Currently excelling in mathematics and computer science, with a focus on applying AI in environmental science.</p>
    </section>
    <section class="resume-section-vibrant">
        <h2>AI Projects</h2>
        <ul>
            <li>AI-Driven Recycling Sorter</li>
            <li>Virtual Reality Ecosystem for Endangered Species Awareness</li>
        </ul>
    </section>
    <footer class="resume-footer-vibrant">Powered by Work ED</footer>
</div>
`;
            cssContent = `
.resume-container-vibrant {
    font-family: 'Arial', sans-serif;
    color: #333;
    background-color: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    max-width: 800px;
    margin: auto;
    border: 2px solid #2EA363;
}
.profile-img-vibrant {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    margin: 20px auto 10px;
    border: 3px solid #2EA363;
}
.resume-header-vibrant h1, .resume-header-vibrant p {
    text-align: center;
    margin: 0;
}
.resume-header-vibrant h1 {
    color: #2EA363;
    margin-bottom: 5px;
}
.resume-header-vibrant p {
    font-style: italic;
    color: #666;
}
.resume-section-vibrant, .resume-footer-vibrant {
    padding: 15px;
    border-radius: 10px;
    margin-top: 20px;
}
.resume-section-vibrant h2, .resume-footer-vibrant {
    color: #2EA363;
    margin: 0;
}
.resume-section-vibrant ul {
    list-style: none;
    padding: 0;
}
.resume-section-vibrant ul li {
    background-color: #e6f9f1;
    color: #333;
    margin: 10px 0;
    padding: 10px;
    border-radius: 10px;
}
.resume-footer-vibrant {
    text-align: center;
    font-size: 0.8em;
    color: #666;
}`;
            break;
        default:
            console.error('Unknown template: ' + templateName);
            return;
    }

    // Load the content into the HTML and CSS tabs
    document.getElementById('html').value = htmlContent;
    document.getElementById('css').value = cssContent;

    // Switch to the HTML tab and update the preview
    switchTab('html');
    updatePreview();
}

function copyToClipboard(elementId) {
    var content = document.getElementById(elementId).value;
    navigator.clipboard.writeText(content).then(function() {
        alert('Copied to clipboard!');
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}

function openLesson(evt, lessonName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(lessonName).style.display = "block";
    evt.currentTarget.className += " active";
}
