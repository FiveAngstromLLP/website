// Molecular Viewer Setup
window.onload = function () {
    let element = document.getElementById('molecule-viewer');
    let config = { backgroundColor: 'white' };
    let viewer = $3Dmol.createViewer(element, config);

    // Load the structure of the Aβ42 peptide (PDB ID: 1IYT)
    $3Dmol.download('pdb:1IYT', viewer, {}, function() {
        viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
        viewer.zoomTo();
        viewer.render();
    });
};

