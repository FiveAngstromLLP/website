window.onload = function () {
    let element = document.getElementById('molecule-viewer');
    let config = { backgroundColor: 'white' };
    let viewer = $3Dmol.createViewer(element, config);

    let pdbData = ''; // To hold the entire PDB file contents
    let models = [];  // Array to hold each MODEL section
    let currentModelIndex = 0; // Track the current MODEL index
    let rotationInterval;

    // Function to extract MODELs from PDB data
    function extractModels(pdb) {
        models = []; // Clear models array
        let currentModel = '';
        let lines = pdb.split('\n');

        lines.forEach((line) => {
            if (line.startsWith('MODEL')) {
                currentModel = ''; // Start a new model
            }
            currentModel += line + '\n'; // Append line to the current model
            if (line.startsWith('ENDMDL')) {
                models.push(currentModel); // Save the completed model
            }
        });

        // If there's only one model or no explicit MODEL/ENDMDL tags, save the entire structure as one model
        if (models.length === 0) {
            models.push(pdb);
        }
    }

    // Function to load a specific MODEL into the viewer
    function loadModel(index) {
        if (index >= 0 && index < models.length) {
            viewer.clear();
            viewer.addModel(models[index], "pdb");
            applyViewStyle(); // Apply the current selected view style
            viewer.zoomTo();
            viewer.render();
            currentModelIndex = index; // Update the current model index
        } else {
            alert('No more models to display.');
        }
    }

    // Function to apply the selected view style
    function applyViewStyle() {
        viewer.setStyle({}, {}); // Clear current styles
        let style = document.getElementById('viewStyle').value;

        if (style === 'cartoon') {
            viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
        } else if (style === 'ribbon') {
            viewer.setStyle({}, { ribbon: { color: 'spectrum' } });
        } else if (style === 'ballStick') {
            viewer.setStyle({}, { stick: { radius: 0.2 }, sphere: { scale: 0.3 } });
        }
        viewer.render();
    }

    // Function to start rotating the DNA structure
    function startRotation() {
        rotationInterval = setInterval(() => {
            viewer.rotate(1);
            viewer.render();
        }, 100);
    }

    // Function to stop rotating the DNA structure
    function stopRotation() {
        clearInterval(rotationInterval);
    }

    // Load the initial DNA structure using a PDB code
    let pdbCode = '1BNA'; // Example PDB code for DNA structure
    $3Dmol.download(`pdb:${pdbCode}`, viewer, {}, function() {
        viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
        viewer.zoomTo();
        viewer.render();
        startRotation();
    });

    // Handle PDB file upload
    document.getElementById('pdbFileInput').addEventListener('change', function(event) {
        let file = event.target.files[0];
        if (file && file.name.endsWith('.pdb')) {
            let reader = new FileReader();
            reader.onload = function(e) {
                stopRotation(); // Stop the DNA rotation
                pdbData = e.target.result;
                extractModels(pdbData); // Extract models from the uploaded PDB file
                loadModel(0); // Load the first model
            };
            reader.readAsText(file);
        } else {
            alert("Please upload a valid PDB file.");
        }
    });

    // Handle Next button click to load the next MODEL
    document.getElementById('nextPdbBtn').addEventListener('click', function() {
        if (models.length > 1) {
            let nextModelIndex = (currentModelIndex + 1) % models.length;
            loadModel(nextModelIndex);
        } else {
            alert('This PDB file does not contain multiple models.');
        }
    });

    // Handle Previous button click to load the previous MODEL
    document.getElementById('prevPdbBtn').addEventListener('click', function() {
        if (models.length > 1) {
            let prevModelIndex = (currentModelIndex - 1 + models.length) % models.length;
            loadModel(prevModelIndex);
        } else {
            alert('This PDB file does not contain multiple models.');
        }
    });

    // Handle changing of viewing styles
    document.getElementById('viewStyle').addEventListener('change', function() {
        applyViewStyle(); // Apply the selected style when the dropdown changes
    });
};
