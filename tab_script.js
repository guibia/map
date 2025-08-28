    <script>
        // Tab functionality for grouped vs ungrouped views
        const groupedTab = document.getElementById("grouped-tab");
        const ungroupedTab = document.getElementById("ungrouped-tab");
        const map = map_d3800bd0d5c888638c2a5429fbfb5e58;
        const markerCluster = marker_cluster_aa6b01b295d8401bd5db6c755b712294;
        
        // Store original icons to restore them later
        const originalIcons = new Map();
        
        // Function to show grouped view (with clustering)
        function showGroupedView() {
            // Remove all individual markers from the map
            markerCluster.getLayers().forEach(function(marker) {
                map.removeLayer(marker);
                // Restore original icon
                if (originalIcons.has(marker)) {
                    marker.setIcon(originalIcons.get(marker));
                }
            });
            
            // Add the marker cluster back
            if (!map.hasLayer(markerCluster)) {
                markerCluster.addTo(map);
            }
            
            groupedTab.style.background = "#4CAF50";
            ungroupedTab.style.background = "#666";
        }
        
        // Function to show ungrouped view (individual markers)
        function showUngroupedView() {
            // Remove the marker cluster
            map.removeLayer(markerCluster);
            
            // Add all individual markers directly to the map with custom icon
            markerCluster.getLayers().forEach(function(marker) {
                // Store original icon if not already stored
                if (!originalIcons.has(marker)) {
                    originalIcons.set(marker, marker.options.icon);
                }
                
                // Create custom icon for ungrouped view
                const customIcon = L.icon({
                    iconUrl: 'c.png',
                    iconSize: [6, 6],
                    iconAnchor: [3, 6],
                    popupAnchor: [0, -6]
                });
                
                // Set the custom icon
                marker.setIcon(customIcon);
                
                // Add marker to map
                marker.addTo(map);
            });
            
            groupedTab.style.background = "#666";
            ungroupedTab.style.background = "#4CAF50";
        }
        
        // Event listeners for tabs
        groupedTab.addEventListener("click", showGroupedView);
        ungroupedTab.addEventListener("click", showUngroupedView);
        
        // Initialize with grouped view active
        showGroupedView();
    </script>
