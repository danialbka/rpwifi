// Track completed steps
const completedSteps = new Set();

function checkStep(stepNumber) {
    completedSteps.add(stepNumber);
    const button = event.target;
    button.textContent = '✓ Completed';
    button.classList.add('completed');
    button.disabled = true;
    
    // Highlight next step
    if (stepNumber < 3) {
        const nextStep = document.getElementById(`step${stepNumber + 1}`);
        if (nextStep) {
            nextStep.style.backgroundColor = '#fff';
            nextStep.style.borderLeftColor = '#4caf50';
        }
    }
}

function testConnection() {
    const resultDiv = document.getElementById('test-result');
    const testBtn = document.querySelector('.test-btn');
    
    // Show checking state
    resultDiv.className = 'test-result checking';
    resultDiv.textContent = 'Testing connection...';
    testBtn.disabled = true;
    testBtn.textContent = 'Testing...';
    
    // Try to fetch a small resource to test connectivity
    // Using a reliable CDN endpoint
    const testImage = new Image();
    const startTime = Date.now();
    
    testImage.onload = function() {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        resultDiv.className = 'test-result success';
        resultDiv.innerHTML = `✓ Connection successful!<br>Response time: ${duration}ms<br>Your WiFi is working properly.`;
        testBtn.disabled = false;
        testBtn.textContent = 'Test Connection';
        
        // Mark step 3 as completed
        if (!completedSteps.has(3)) {
            checkStep(3);
        }
    };
    
    testImage.onerror = function() {
        resultDiv.className = 'test-result error';
        resultDiv.innerHTML = `✗ Connection test failed.<br>Please check:<br>• Are you connected to POLITE-MALL?<br>• Is DNS set to automatic?<br>• Try refreshing your browser or restarting your device.`;
        testBtn.disabled = false;
        testBtn.textContent = 'Test Connection Again';
    };
    
    // Set a timeout in case the request hangs
    setTimeout(function() {
        if (testImage.complete === false) {
            testImage.onerror();
        }
    }, 10000);
    
    // Try to load a small image from a reliable CDN
    // Using a timestamp to prevent caching
    testImage.src = 'https://www.google.com/favicon.ico?t=' + Date.now();
}

// Check if user has completed previous steps before allowing next
document.addEventListener('DOMContentLoaded', function() {
    const step2Btn = document.querySelector('#step2 .btn');
    const step3Btn = document.querySelector('#step3 .btn');
    
    // Initially disable step 2 and 3 buttons (optional - can be removed for free navigation)
    // Uncomment below if you want sequential step completion
    
    /*
    step2Btn.disabled = true;
    step3Btn.disabled = true;
    
    // Enable step 2 after step 1 is completed
    document.querySelector('#step1 .btn').addEventListener('click', function() {
        setTimeout(() => {
            step2Btn.disabled = false;
        }, 500);
    });
    
    // Enable step 3 after step 2 is completed
    step2Btn.addEventListener('click', function() {
        setTimeout(() => {
            step3Btn.disabled = false;
        }, 500);
    });
    */
});

