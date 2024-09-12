// Create the viewer for the molecule
let element = document.getElementById('molecule-3d');
let config = { backgroundColor: 'white' };
let viewer = $3Dmol.createViewer(element, config);

// Load a molecule from PDB (example: DNA 1BNA)
$3Dmol.download('pdb:1BNA', viewer, {}, function () {
    viewer.setStyle({}, {stick: {} }); // Render the molecule in stick model
    viewer.zoomTo(); // Zoom into the molecule
    viewer.render(); // Render the scene
    viewer.zoom(1.2, 1000); // Zoom factor
});