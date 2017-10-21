/* eslint-disable */
export default `
    .mapboxgl-map {
        font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
        overflow: hidden;
        position: relative;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }

    .mapboxgl-missing-css {
        display: none;
    }

    .mapboxgl-canvas-container.mapboxgl-interactive,
    .mapboxgl-ctrl-nav-compass {
        cursor: -webkit-grab;
        cursor: -moz-grab;
        cursor: grab;
    }
    .mapboxgl-canvas-container.mapboxgl-interactive:active,
    .mapboxgl-ctrl-nav-compass:active {
        cursor: -webkit-grabbing;
        cursor: -moz-grabbing;
        cursor: grabbing;
    }

    .mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate {
        -ms-touch-action: pan-x pan-y;
        touch-action: pan-x pan-y;
    }
    .mapboxgl-canvas-container.mapboxgl-touch-drag-pan {
        -ms-touch-action: pinch-zoom;
    }
    .mapboxgl-canvas-container.mapboxgl-touch-zoom-rotate.mapboxgl-touch-drag-pan {
        -ms-touch-action: none;
        touch-action: none;
    }
    .mapboxgl-ctrl-top-left,
    .mapboxgl-ctrl-top-right,
    .mapboxgl-ctrl-bottom-left,
    .mapboxgl-ctrl-bottom-right  { position:absolute; pointer-events:none; z-index:2; }
    .mapboxgl-ctrl-top-left      { top:0; left:0; }
    .mapboxgl-ctrl-top-right     { top:0; right:0; }
    .mapboxgl-ctrl-bottom-left   { bottom:0; left:0; }
    .mapboxgl-ctrl-bottom-right  { right:0; bottom:0; }

    .mapboxgl-ctrl { clear:both; pointer-events:auto }
    .mapboxgl-ctrl-top-left .mapboxgl-ctrl { margin:10px 0 0 10px; float:left; }
    .mapboxgl-ctrl-top-right .mapboxgl-ctrl{ margin:10px 10px 0 0; float:right; }
    .mapboxgl-ctrl-bottom-left .mapboxgl-ctrl { margin:0 0 10px 10px; float:left; }
    .mapboxgl-ctrl-bottom-right .mapboxgl-ctrl { margin:0 10px 10px 0; float:right; }

    .mapboxgl-ctrl-group {
        border-radius: 4px;
        -moz-box-shadow: 0px 0px 2px rgba(0,0,0,0.1);
        -webkit-box-shadow: 0px 0px 2px rgba(0,0,0,0.1);
        box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.1);
        overflow: hidden;
        background: #fff;
    }
    .mapboxgl-ctrl-group > button {
        width: 30px;
        height: 30px;
        display: block;
        padding: 0;
        outline: none;
        border: none;
        border-bottom: 1px solid #ddd;
        box-sizing: border-box;
        background-color: rgba(0,0,0,0);
        cursor: pointer;
    }
    /* https://bugzilla.mozilla.org/show_bug.cgi?id=140562 */
    .mapboxgl-ctrl > button::-moz-focus-inner {
        border: 0;
        padding: 0;
    }
    .mapboxgl-ctrl > button:last-child {
        border-bottom: 0;
    }
    .mapboxgl-ctrl > button:hover {
        background-color: rgba(0,0,0,0.05);
    }
    .mapboxgl-ctrl-icon,
    .mapboxgl-ctrl-icon > .mapboxgl-ctrl-compass-arrow {
        speak: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .mapboxgl-ctrl-icon {
        padding: 5px;
    }
    .mapboxgl-ctrl-icon.mapboxgl-ctrl-zoom-out {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%0A%20%20%3Cpath%20style%3D%27fill%3A%23333333%3B%27%20d%3D%27m%207%2C9%20c%20-0.554%2C0%20-1%2C0.446%20-1%2C1%200%2C0.554%200.446%2C1%201%2C1%20l%206%2C0%20c%200.554%2C0%201%2C-0.446%201%2C-1%200%2C-0.554%20-0.446%2C-1%20-1%2C-1%20z%27%20%2F%3E%0A%3C%2Fsvg%3E%0A");
    }
    .mapboxgl-ctrl-icon.mapboxgl-ctrl-zoom-in {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%0A%20%20%3Cpath%20style%3D%27fill%3A%23333333%3B%27%20d%3D%27M%2010%206%20C%209.446%206%209%206.4459904%209%207%20L%209%209%20L%207%209%20C%206.446%209%206%209.446%206%2010%20C%206%2010.554%206.446%2011%207%2011%20L%209%2011%20L%209%2013%20C%209%2013.55401%209.446%2014%2010%2014%20C%2010.554%2014%2011%2013.55401%2011%2013%20L%2011%2011%20L%2013%2011%20C%2013.554%2011%2014%2010.554%2014%2010%20C%2014%209.446%2013.554%209%2013%209%20L%2011%209%20L%2011%207%20C%2011%206.4459904%2010.554%206%2010%206%20z%27%20%2F%3E%0A%3C%2Fsvg%3E%0A");
    }
    .mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%0D%0A%20%20%3Cpath%20style%3D%27fill%3A%23333%3B%27%20d%3D%27M10%204C9%204%209%205%209%205L9%205.1A5%205%200%200%200%205.1%209L5%209C5%209%204%209%204%2010%204%2011%205%2011%205%2011L5.1%2011A5%205%200%200%200%209%2014.9L9%2015C9%2015%209%2016%2010%2016%2011%2016%2011%2015%2011%2015L11%2014.9A5%205%200%200%200%2014.9%2011L15%2011C15%2011%2016%2011%2016%2010%2016%209%2015%209%2015%209L14.9%209A5%205%200%200%200%2011%205.1L11%205C11%205%2011%204%2010%204zM10%206.5A3.5%203.5%200%200%201%2013.5%2010%203.5%203.5%200%200%201%2010%2013.5%203.5%203.5%200%200%201%206.5%2010%203.5%203.5%200%200%201%2010%206.5zM10%208.3A1.8%201.8%200%200%200%208.3%2010%201.8%201.8%200%200%200%2010%2011.8%201.8%201.8%200%200%200%2011.8%2010%201.8%201.8%200%200%200%2010%208.3z%27%20%2F%3E%0D%0A%3C%2Fsvg%3E");
    }
    .mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate:disabled {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%0D%0A%20%20%3Cpath%20style%3D%27fill%3A%23aaa%3B%27%20d%3D%27M10%204C9%204%209%205%209%205L9%205.1A5%205%200%200%200%205.1%209L5%209C5%209%204%209%204%2010%204%2011%205%2011%205%2011L5.1%2011A5%205%200%200%200%209%2014.9L9%2015C9%2015%209%2016%2010%2016%2011%2016%2011%2015%2011%2015L11%2014.9A5%205%200%200%200%2014.9%2011L15%2011C15%2011%2016%2011%2016%2010%2016%209%2015%209%2015%209L14.9%209A5%205%200%200%200%2011%205.1L11%205C11%205%2011%204%2010%204zM10%206.5A3.5%203.5%200%200%201%2013.5%2010%203.5%203.5%200%200%201%2010%2013.5%203.5%203.5%200%200%201%206.5%2010%203.5%203.5%200%200%201%2010%206.5zM10%208.3A1.8%201.8%200%200%200%208.3%2010%201.8%201.8%200%200%200%2010%2011.8%201.8%201.8%200%200%200%2011.8%2010%201.8%201.8%200%200%200%2010%208.3z%27%20%2F%3E%0D%0A%3C%2Fsvg%3E");
    }
    .mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%0D%0A%20%20%3Cpath%20style%3D%27fill%3A%2333b5e5%3B%27%20d%3D%27M10%204C9%204%209%205%209%205L9%205.1A5%205%200%200%200%205.1%209L5%209C5%209%204%209%204%2010%204%2011%205%2011%205%2011L5.1%2011A5%205%200%200%200%209%2014.9L9%2015C9%2015%209%2016%2010%2016%2011%2016%2011%2015%2011%2015L11%2014.9A5%205%200%200%200%2014.9%2011L15%2011C15%2011%2016%2011%2016%2010%2016%209%2015%209%2015%209L14.9%209A5%205%200%200%200%2011%205.1L11%205C11%205%2011%204%2010%204zM10%206.5A3.5%203.5%200%200%201%2013.5%2010%203.5%203.5%200%200%201%2010%2013.5%203.5%203.5%200%200%201%206.5%2010%203.5%203.5%200%200%201%2010%206.5zM10%208.3A1.8%201.8%200%200%200%208.3%2010%201.8%201.8%200%200%200%2010%2011.8%201.8%201.8%200%200%200%2011.8%2010%201.8%201.8%200%200%200%2010%208.3z%27%20%2F%3E%0D%0A%3C%2Fsvg%3E");
    }
    .mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active-error {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%0D%0A%20%20%3Cpath%20style%3D%27fill%3A%23e58978%3B%27%20d%3D%27M10%204C9%204%209%205%209%205L9%205.1A5%205%200%200%200%205.1%209L5%209C5%209%204%209%204%2010%204%2011%205%2011%205%2011L5.1%2011A5%205%200%200%200%209%2014.9L9%2015C9%2015%209%2016%2010%2016%2011%2016%2011%2015%2011%2015L11%2014.9A5%205%200%200%200%2014.9%2011L15%2011C15%2011%2016%2011%2016%2010%2016%209%2015%209%2015%209L14.9%209A5%205%200%200%200%2011%205.1L11%205C11%205%2011%204%2010%204zM10%206.5A3.5%203.5%200%200%201%2013.5%2010%203.5%203.5%200%200%201%2010%2013.5%203.5%203.5%200%200%201%206.5%2010%203.5%203.5%200%200%201%2010%206.5zM10%208.3A1.8%201.8%200%200%200%208.3%2010%201.8%201.8%200%200%200%2010%2011.8%201.8%201.8%200%200%200%2011.8%2010%201.8%201.8%200%200%200%2010%208.3z%27%20%2F%3E%0D%0A%3C%2Fsvg%3E");
    }
    .mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%0A%20%20%3Cpath%20style%3D%27fill%3A%2333b5e5%3B%27%20d%3D%27M%2010%2C4%20C%209%2C4%209%2C5%209%2C5%20L%209%2C5.1%20C%207.0357113%2C5.5006048%205.5006048%2C7.0357113%205.1%2C9%20L%205%2C9%20c%200%2C0%20-1%2C0%20-1%2C1%200%2C1%201%2C1%201%2C1%20l%200.1%2C0%20c%200.4006048%2C1.964289%201.9357113%2C3.499395%203.9%2C3.9%20L%209%2C15%20c%200%2C0%200%2C1%201%2C1%201%2C0%201%2C-1%201%2C-1%20l%200%2C-0.1%20c%201.964289%2C-0.400605%203.499395%2C-1.935711%203.9%2C-3.9%20l%200.1%2C0%20c%200%2C0%201%2C0%201%2C-1%20C%2016%2C9%2015%2C9%2015%2C9%20L%2014.9%2C9%20C%2014.499395%2C7.0357113%2012.964289%2C5.5006048%2011%2C5.1%20L%2011%2C5%20c%200%2C0%200%2C-1%20-1%2C-1%20z%20m%200%2C2.5%20c%201.932997%2C0%203.5%2C1.5670034%203.5%2C3.5%200%2C1.932997%20-1.567003%2C3.5%20-3.5%2C3.5%20C%208.0670034%2C13.5%206.5%2C11.932997%206.5%2C10%206.5%2C8.0670034%208.0670034%2C6.5%2010%2C6.5%20Z%27%20%2F%3E%0A%3C%2Fsvg%3E");
    }
    .mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background-error {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%0A%20%20%3Cpath%20style%3D%27fill%3A%23e54e33%3B%27%20d%3D%27M%2010%2C4%20C%209%2C4%209%2C5%209%2C5%20L%209%2C5.1%20C%207.0357113%2C5.5006048%205.5006048%2C7.0357113%205.1%2C9%20L%205%2C9%20c%200%2C0%20-1%2C0%20-1%2C1%200%2C1%201%2C1%201%2C1%20l%200.1%2C0%20c%200.4006048%2C1.964289%201.9357113%2C3.499395%203.9%2C3.9%20L%209%2C15%20c%200%2C0%200%2C1%201%2C1%201%2C0%201%2C-1%201%2C-1%20l%200%2C-0.1%20c%201.964289%2C-0.400605%203.499395%2C-1.935711%203.9%2C-3.9%20l%200.1%2C0%20c%200%2C0%201%2C0%201%2C-1%20C%2016%2C9%2015%2C9%2015%2C9%20L%2014.9%2C9%20C%2014.499395%2C7.0357113%2012.964289%2C5.5006048%2011%2C5.1%20L%2011%2C5%20c%200%2C0%200%2C-1%20-1%2C-1%20z%20m%200%2C2.5%20c%201.932997%2C0%203.5%2C1.5670034%203.5%2C3.5%200%2C1.932997%20-1.567003%2C3.5%20-3.5%2C3.5%20C%208.0670034%2C13.5%206.5%2C11.932997%206.5%2C10%206.5%2C8.0670034%208.0670034%2C6.5%2010%2C6.5%20Z%27%20%2F%3E%0A%3C%2Fsvg%3E");
    }
    .mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-waiting {
        -webkit-animation: mapboxgl-spin 2s infinite linear;
        -moz-animation: mapboxgl-spin 2s infinite linear;
        -o-animation: mapboxgl-spin 2s infinite linear;
        -ms-animation: mapboxgl-spin 2s infinite linear;
        animation: mapboxgl-spin 2s infinite linear;
    }

    @-webkit-keyframes mapboxgl-spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }
    @-moz-keyframes mapboxgl-spin {
        0% { -moz-transform: rotate(0deg); }
        100% { -moz-transform: rotate(360deg); }
    }
    @-o-keyframes mapboxgl-spin {
        0% { -o-transform: rotate(0deg); }
        100% { -o-transform: rotate(360deg); }
    }
    @-ms-keyframes mapboxgl-spin {
        0% { -ms-transform: rotate(0deg); }
        100% { -ms-transform: rotate(360deg); }
    }
    @keyframes mapboxgl-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    .mapboxgl-ctrl-icon.mapboxgl-ctrl-fullscreen  {
        background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KCjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0iTGF5ZXJfMSIKICAgeD0iMHB4IgogICB5PSIwcHgiCiAgIHZpZXdCb3g9IjAgMCAyMCAyMCIKICAgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjAgMjA7IgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkxIHIxMzcyNSIKICAgc29kaXBvZGk6ZG9jbmFtZT0iZnVsbHNjcmVlbi5zdmciPjxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTQxODUiPjxyZGY6UkRGPjxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj48ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD48ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+PGRjOnRpdGxlPjwvZGM6dGl0bGU+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxkZWZzCiAgICAgaWQ9ImRlZnM0MTgzIiAvPjxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIgogICAgIGdyaWR0b2xlcmFuY2U9IjEwIgogICAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTQ3MSIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI2OTUiCiAgICAgaWQ9Im5hbWVkdmlldzQxODEiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjExLjMxMzcwOCIKICAgICBpbmtzY2FwZTpjeD0iMTQuNjk4MjgiCiAgICAgaW5rc2NhcGU6Y3k9IjEwLjUyNjY4OSIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iNjk3IgogICAgIGlua3NjYXBlOndpbmRvdy15PSIyOTgiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJMYXllcl8xIgogICAgIGlua3NjYXBlOnNuYXAtYmJveD0idHJ1ZSIKICAgICBpbmtzY2FwZTpiYm94LXBhdGhzPSJ0cnVlIgogICAgIGlua3NjYXBlOm9iamVjdC1wYXRocz0idHJ1ZSIKICAgICBpbmtzY2FwZTpiYm94LW5vZGVzPSJ0cnVlIgogICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSI+PGlua3NjYXBlOmdyaWQKICAgICAgIHR5cGU9Inh5Z3JpZCIKICAgICAgIGlkPSJncmlkNjA3NiIgLz48L3NvZGlwb2RpOm5hbWVkdmlldz48cGF0aAogICAgIGQ9Ik0gNSA0IEMgNC41IDQgNCA0LjUgNCA1IEwgNCA2IEwgNCA5IEwgNC41IDkgTCA1Ljc3NzM0MzggNy4yOTY4NzUgQyA2Ljc3NzEzMTkgOC4wNjAyMTMxIDcuODM1NzY1IDguOTU2NTcyOCA4Ljg5MDYyNSAxMCBDIDcuODI1NzEyMSAxMS4wNjMzIDYuNzc2MTc5MSAxMS45NTE2NzUgNS43ODEyNSAxMi43MDcwMzEgTCA0LjUgMTEgTCA0IDExIEwgNCAxNSBDIDQgMTUuNSA0LjUgMTYgNSAxNiBMIDkgMTYgTCA5IDE1LjUgTCA3LjI3MzQzNzUgMTQuMjA1MDc4IEMgOC4wNDI4OTMxIDEzLjE4Nzg4NiA4LjkzOTU0NDEgMTIuMTMzNDgxIDkuOTYwOTM3NSAxMS4wNjgzNTkgQyAxMS4wNDIzNzEgMTIuMTQ2OTkgMTEuOTQyMDkzIDEzLjIxMTIgMTIuNzA3MDMxIDE0LjIxODc1IEwgMTEgMTUuNSBMIDExIDE2IEwgMTQgMTYgTCAxNSAxNiBDIDE1LjUgMTYgMTYgMTUuNSAxNiAxNSBMIDE2IDE0IEwgMTYgMTEgTCAxNS41IDExIEwgMTQuMjA1MDc4IDEyLjcyNjU2MiBDIDEzLjE3Nzk4NSAxMS45NDk2MTcgMTIuMTEyNzE4IDExLjA0MzU3NyAxMS4wMzcxMDkgMTAuMDA5NzY2IEMgMTIuMTUxODU2IDguOTgxMDYxIDEzLjIyNDM0NSA4LjA3OTg2MjQgMTQuMjI4NTE2IDcuMzA0Njg3NSBMIDE1LjUgOSBMIDE2IDkgTCAxNiA1IEMgMTYgNC41IDE1LjUgNCAxNSA0IEwgMTEgNCBMIDExIDQuNSBMIDEyLjcwMzEyNSA1Ljc3NzM0MzggQyAxMS45MzI2NDcgNi43ODY0ODM0IDExLjAyNjY5MyA3Ljg1NTQ3MTIgOS45NzA3MDMxIDguOTE5OTIxOSBDIDguOTU4NDczOSA3LjgyMDQ5NDMgOC4wNjk4NzY3IDYuNzYyNzE4OCA3LjMwNDY4NzUgNS43NzE0ODQ0IEwgOSA0LjUgTCA5IDQgTCA2IDQgTCA1IDQgeiAiCiAgICAgaWQ9InBhdGg0MTY5IiAvPjwvc3ZnPg==");
    }
    .mapboxgl-ctrl-icon.mapboxgl-ctrl-shrink  {
        background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KCjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0iTGF5ZXJfMSIKICAgeD0iMHB4IgogICB5PSIwcHgiCiAgIHZpZXdCb3g9IjAgMCAyMCAyMCIKICAgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjAgMjA7IgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkxIHIxMzcyNSIKICAgc29kaXBvZGk6ZG9jbmFtZT0ic2hyaW5rLnN2ZyI+PG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMTkiPjxyZGY6UkRGPjxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj48ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD48ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+PGRjOnRpdGxlPjwvZGM6dGl0bGU+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxkZWZzCiAgICAgaWQ9ImRlZnMxNyIgLz48c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgb2JqZWN0dG9sZXJhbmNlPSIxMCIKICAgICBncmlkdG9sZXJhbmNlPSIxMCIKICAgICBndWlkZXRvbGVyYW5jZT0iMTAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjIwMjEiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iOTA4IgogICAgIGlkPSJuYW1lZHZpZXcxNSIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iMSIKICAgICBpbmtzY2FwZTpjeD0iNC45NTAxMDgyIgogICAgIGlua3NjYXBlOmN5PSIxMC44NTQ3NDciCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjAiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjAiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJMYXllcl8xIgogICAgIGlua3NjYXBlOnNuYXAtYmJveD0idHJ1ZSIKICAgICBpbmtzY2FwZTpiYm94LXBhdGhzPSJ0cnVlIgogICAgIGlua3NjYXBlOnNuYXAtYmJveC1lZGdlLW1pZHBvaW50cz0idHJ1ZSIKICAgICBpbmtzY2FwZTpiYm94LW5vZGVzPSJ0cnVlIgogICAgIGlua3NjYXBlOnNuYXAtYmJveC1taWRwb2ludHM9InRydWUiCiAgICAgaW5rc2NhcGU6b2JqZWN0LXBhdGhzPSJ0cnVlIgogICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSI+PGlua3NjYXBlOmdyaWQKICAgICAgIHR5cGU9Inh5Z3JpZCIKICAgICAgIGlkPSJncmlkNDE0NyIgLz48L3NvZGlwb2RpOm5hbWVkdmlldz48cGF0aAogICAgIHN0eWxlPSJmaWxsOiMwMDAwMDAiCiAgICAgZD0iTSA0LjI0MjE4NzUgMy40OTIxODc1IEEgMC43NTAwNzUgMC43NTAwNzUgMCAwIDAgMy43MTg3NSA0Ljc4MTI1IEwgNS45NjQ4NDM4IDcuMDI3MzQzOCBMIDQgOC41IEwgNCA5IEwgOCA5IEMgOC41MDAwMDEgOC45OTk5OTg4IDkgOC40OTk5OTkyIDkgOCBMIDkgNCBMIDguNSA0IEwgNy4wMTc1NzgxIDUuOTU1MDc4MSBMIDQuNzgxMjUgMy43MTg3NSBBIDAuNzUwMDc1IDAuNzUwMDc1IDAgMCAwIDQuMjQyMTg3NSAzLjQ5MjE4NzUgeiBNIDE1LjczNDM3NSAzLjQ5MjE4NzUgQSAwLjc1MDA3NSAwLjc1MDA3NSAwIDAgMCAxNS4yMTg3NSAzLjcxODc1IEwgMTIuOTg0Mzc1IDUuOTUzMTI1IEwgMTEuNSA0IEwgMTEgNCBMIDExIDggQyAxMSA4LjQ5OTk5OTIgMTEuNDk5OTk5IDguOTk5OTk4OCAxMiA5IEwgMTYgOSBMIDE2IDguNSBMIDE0LjAzNTE1NiA3LjAyNzM0MzggTCAxNi4yODEyNSA0Ljc4MTI1IEEgMC43NTAwNzUgMC43NTAwNzUgMCAwIDAgMTUuNzM0Mzc1IDMuNDkyMTg3NSB6IE0gNCAxMSBMIDQgMTEuNSBMIDUuOTY0ODQzOCAxMi45NzI2NTYgTCAzLjcxODc1IDE1LjIxODc1IEEgMC43NTEzMDA5NiAwLjc1MTMwMDk2IDAgMSAwIDQuNzgxMjUgMTYuMjgxMjUgTCA3LjAyNzM0MzggMTQuMDM1MTU2IEwgOC41IDE2IEwgOSAxNiBMIDkgMTIgQyA5IDExLjUwMDAwMSA4LjUwMDAwMSAxMS4wMDAwMDEgOCAxMSBMIDQgMTEgeiBNIDEyIDExIEMgMTEuNDk5OTk5IDExLjAwMDAwMSAxMSAxMS41MDAwMDEgMTEgMTIgTCAxMSAxNiBMIDExLjUgMTYgTCAxMi45NzI2NTYgMTQuMDM1MTU2IEwgMTUuMjE4NzUgMTYuMjgxMjUgQSAwLjc1MTMwMDk2IDAuNzUxMzAwOTYgMCAxIDAgMTYuMjgxMjUgMTUuMjE4NzUgTCAxNC4wMzUxNTYgMTIuOTcyNjU2IEwgMTYgMTEuNSBMIDE2IDExIEwgMTIgMTEgeiAiCiAgICAgaWQ9InBhdGg3IiAvPjwvc3ZnPg==");
    }
    .mapboxgl-ctrl-icon.mapboxgl-ctrl-compass > .mapboxgl-ctrl-compass-arrow {
        width: 20px;
        height: 20px;
        margin: 5px;
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2020%2020%27%3E%0A%09%3Cpolygon%20fill%3D%27%23333333%27%20points%3D%276%2C9%2010%2C1%2014%2C9%27%2F%3E%0A%09%3Cpolygon%20fill%3D%27%23CCCCCC%27%20points%3D%276%2C11%2010%2C19%2014%2C11%20%27%2F%3E%0A%3C%2Fsvg%3E");
        background-repeat: no-repeat;
        display: inline-block;
    }

    a.mapboxgl-ctrl-logo {
        width: 85px;
        height: 21px;
        margin: 0 0 -3px -3px;
        display: block;
        background-repeat: no-repeat;
        cursor: pointer;
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiAgIHZpZXdCb3g9IjAgMCA4NC40OSAyMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgODQuNDkgMjE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz4gIDxwYXRoIGNsYXNzPSJzdDAiIHN0eWxlPSJvcGFjaXR5OjAuOTsgZmlsbDogI0ZGRkZGRjsgZW5hYmxlLWJhY2tncm91bmQ6IG5ldzsiIGQ9Ik04My4yNSwxNC4yNmMwLDAuMTItMC4wOSwwLjIxLTAuMjEsMC4yMWgtMS42MWMtMC4xMywwLTAuMjQtMC4wNi0wLjMtMC4xN2wtMS40NC0yLjM5bC0xLjQ0LDIuMzkgICAgYy0wLjA2LDAuMTEtMC4xOCwwLjE3LTAuMywwLjE3aC0xLjYxYy0wLjA0LDAtMC4wOC0wLjAxLTAuMTItMC4wM2MtMC4wOS0wLjA2LTAuMTMtMC4xOS0wLjA2LTAuMjhsMCwwbDIuNDMtMy42OEw3Ni4yLDYuODQgICAgYy0wLjAyLTAuMDMtMC4wMy0wLjA3LTAuMDMtMC4xMmMwLTAuMTIsMC4wOS0wLjIxLDAuMjEtMC4yMWgxLjYxYzAuMTMsMCwwLjI0LDAuMDYsMC4zLDAuMTdsMS40MSwyLjM2bDEuNC0yLjM1ICAgIGMwLjA2LTAuMTEsMC4xOC0wLjE3LDAuMy0wLjE3SDgzYzAuMDQsMCwwLjA4LDAuMDEsMC4xMiwwLjAzYzAuMDksMC4wNiwwLjEzLDAuMTksMC4wNiwwLjI4bDAsMGwtMi4zNywzLjYzbDIuNDMsMy42NyAgICBDODMuMjQsMTQuMTgsODMuMjUsMTQuMjIsODMuMjUsMTQuMjZ6Ii8+ICA8cGF0aCBjbGFzcz0ic3QwIiBzdHlsZT0ib3BhY2l0eTowLjk7IGZpbGw6ICNGRkZGRkY7IGVuYWJsZS1iYWNrZ3JvdW5kOiBuZXc7IiBkPSJNNjYuMjQsOS41OWMtMC4zOS0xLjg4LTEuOTYtMy4yOC0zLjg0LTMuMjhjLTEuMDMsMC0yLjAzLDAuNDItMi43MywxLjE4VjMuNTFjMC0wLjEzLTAuMS0wLjIzLTAuMjMtMC4yM2gtMS40ICAgIGMtMC4xMywwLTAuMjMsMC4xMS0wLjIzLDAuMjN2MTAuNzJjMCwwLjEzLDAuMSwwLjIzLDAuMjMsMC4yM2gxLjRjMC4xMywwLDAuMjMtMC4xMSwwLjIzLTAuMjNWMTMuNWMwLjcxLDAuNzUsMS43LDEuMTgsMi43MywxLjE4ICAgIGMxLjg4LDAsMy40NS0xLjQxLDMuODQtMy4yOUM2Ni4zNywxMC43OSw2Ni4zNywxMC4xOCw2Ni4yNCw5LjU5TDY2LjI0LDkuNTl6IE02Mi4wOCwxM2MtMS4zMiwwLTIuMzktMS4xMS0yLjQxLTIuNDh2LTAuMDYgICAgYzAuMDItMS4zOCwxLjA5LTIuNDgsMi40MS0yLjQ4czIuNDIsMS4xMiwyLjQyLDIuNTFTNjMuNDEsMTMsNjIuMDgsMTN6Ii8+ICA8cGF0aCBjbGFzcz0ic3QwIiBzdHlsZT0ib3BhY2l0eTowLjk7IGZpbGw6ICNGRkZGRkY7IGVuYWJsZS1iYWNrZ3JvdW5kOiBuZXc7IiBkPSJNNzEuNjcsNi4zMmMtMS45OC0wLjAxLTMuNzIsMS4zNS00LjE2LDMuMjljLTAuMTMsMC41OS0wLjEzLDEuMTksMCwxLjc3YzAuNDQsMS45NCwyLjE3LDMuMzIsNC4xNywzLjMgICAgYzIuMzUsMCw0LjI2LTEuODcsNC4yNi00LjE5Uzc0LjA0LDYuMzIsNzEuNjcsNi4zMnogTTcxLjY1LDEzLjAxYy0xLjMzLDAtMi40Mi0xLjEyLTIuNDItMi41MXMxLjA4LTIuNTIsMi40Mi0yLjUyICAgIGMxLjMzLDAsMi40MiwxLjEyLDIuNDIsMi41MVM3Mi45OSwxMyw3MS42NSwxMy4wMUw3MS42NSwxMy4wMXoiLz4gIDxwYXRoIGNsYXNzPSJzdDEiIHN0eWxlPSJvcGFjaXR5OjAuMzU7IGVuYWJsZS1iYWNrZ3JvdW5kOm5ldzsiIGQ9Ik02Mi4wOCw3Ljk4Yy0xLjMyLDAtMi4zOSwxLjExLTIuNDEsMi40OHYwLjA2QzU5LjY4LDExLjksNjAuNzUsMTMsNjIuMDgsMTNzMi40Mi0xLjEyLDIuNDItMi41MSAgICBTNjMuNDEsNy45OCw2Mi4wOCw3Ljk4eiBNNjIuMDgsMTEuNzZjLTAuNjMsMC0xLjE0LTAuNTYtMS4xNy0xLjI1di0wLjA0YzAuMDEtMC42OSwwLjU0LTEuMjUsMS4xNy0xLjI1ICAgIGMwLjYzLDAsMS4xNywwLjU3LDEuMTcsMS4yN0M2My4yNCwxMS4yLDYyLjczLDExLjc2LDYyLjA4LDExLjc2eiIvPiAgPHBhdGggY2xhc3M9InN0MSIgc3R5bGU9Im9wYWNpdHk6MC4zNTsgZW5hYmxlLWJhY2tncm91bmQ6bmV3OyIgZD0iTTcxLjY1LDcuOThjLTEuMzMsMC0yLjQyLDEuMTItMi40MiwyLjUxUzcwLjMyLDEzLDcxLjY1LDEzczIuNDItMS4xMiwyLjQyLTIuNTFTNzIuOTksNy45OCw3MS42NSw3Ljk4eiAgICAgTTcxLjY1LDExLjc2Yy0wLjY0LDAtMS4xNy0wLjU3LTEuMTctMS4yN2MwLTAuNywwLjUzLTEuMjYsMS4xNy0xLjI2czEuMTcsMC41NywxLjE3LDEuMjdDNzIuODIsMTEuMjEsNzIuMjksMTEuNzYsNzEuNjUsMTEuNzZ6IiAgICAvPiAgPHBhdGggY2xhc3M9InN0MCIgc3R5bGU9Im9wYWNpdHk6MC45OyBmaWxsOiAjRkZGRkZGOyBlbmFibGUtYmFja2dyb3VuZDogbmV3OyIgZD0iTTQ1Ljc0LDYuNTNoLTEuNGMtMC4xMywwLTAuMjMsMC4xMS0wLjIzLDAuMjN2MC43M2MtMC43MS0wLjc1LTEuNy0xLjE4LTIuNzMtMS4xOCAgICBjLTIuMTcsMC0zLjk0LDEuODctMy45NCw0LjE5czEuNzcsNC4xOSwzLjk0LDQuMTljMS4wNCwwLDIuMDMtMC40MywyLjczLTEuMTl2MC43M2MwLDAuMTMsMC4xLDAuMjMsMC4yMywwLjIzaDEuNCAgICBjMC4xMywwLDAuMjMtMC4xMSwwLjIzLTAuMjNWNi43NGMwLTAuMTItMC4wOS0wLjIyLTAuMjItMC4yMkM0NS43NSw2LjUzLDQ1Ljc1LDYuNTMsNDUuNzQsNi41M3ogTTQ0LjEyLDEwLjUzICAgIEM0NC4xMSwxMS45LDQzLjAzLDEzLDQxLjcxLDEzcy0yLjQyLTEuMTItMi40Mi0yLjUxczEuMDgtMi41MiwyLjQtMi41MmMxLjMzLDAsMi4zOSwxLjExLDIuNDEsMi40OEw0NC4xMiwxMC41M3oiLz4gIDxwYXRoIGNsYXNzPSJzdDEiIHN0eWxlPSJvcGFjaXR5OjAuMzU7IGVuYWJsZS1iYWNrZ3JvdW5kOm5ldzsiIGQ9Ik00MS43MSw3Ljk4Yy0xLjMzLDAtMi40MiwxLjEyLTIuNDIsMi41MVM0MC4zNywxMyw0MS43MSwxM3MyLjM5LTEuMTEsMi40MS0yLjQ4di0wLjA2ICAgIEM0NC4xLDkuMDksNDMuMDMsNy45OCw0MS43MSw3Ljk4eiBNNDAuNTUsMTAuNDljMC0wLjcsMC41Mi0xLjI3LDEuMTctMS4yN2MwLjY0LDAsMS4xNCwwLjU2LDEuMTcsMS4yNXYwLjA0ICAgIGMtMC4wMSwwLjY4LTAuNTMsMS4yNC0xLjE3LDEuMjRDNDEuMDgsMTEuNzUsNDAuNTUsMTEuMTksNDAuNTUsMTAuNDl6Ii8+ICA8cGF0aCBjbGFzcz0ic3QwIiBzdHlsZT0ib3BhY2l0eTowLjk7IGZpbGw6ICNGRkZGRkY7IGVuYWJsZS1iYWNrZ3JvdW5kOiBuZXc7IiBkPSJNNTIuNDEsNi4zMmMtMS4wMywwLTIuMDMsMC40Mi0yLjczLDEuMThWNi43NWMwLTAuMTMtMC4xLTAuMjMtMC4yMy0wLjIzaC0xLjRjLTAuMTMsMC0wLjIzLDAuMTEtMC4yMywwLjIzICAgIHYxMC43MmMwLDAuMTMsMC4xLDAuMjMsMC4yMywwLjIzaDEuNGMwLjEzLDAsMC4yMy0wLjEsMC4yMy0wLjIzVjEzLjVjMC43MSwwLjc1LDEuNywxLjE4LDIuNzQsMS4xOGMyLjE3LDAsMy45NC0xLjg3LDMuOTQtNC4xOSAgICBTNTQuNTgsNi4zMiw1Mi40MSw2LjMyeiBNNTIuMDgsMTMuMDFjLTEuMzIsMC0yLjM5LTEuMTEtMi40Mi0yLjQ4di0wLjA3YzAuMDItMS4zOCwxLjA5LTIuNDksMi40LTIuNDljMS4zMiwwLDIuNDEsMS4xMiwyLjQxLDIuNTEgICAgUzUzLjQsMTMsNTIuMDgsMTMuMDFMNTIuMDgsMTMuMDF6Ii8+ICA8cGF0aCBjbGFzcz0ic3QxIiBzdHlsZT0ib3BhY2l0eTowLjM1OyBlbmFibGUtYmFja2dyb3VuZDpuZXc7IiBkPSJNNTIuMDgsNy45OGMtMS4zMiwwLTIuMzksMS4xMS0yLjQyLDIuNDh2MC4wNmMwLjAzLDEuMzgsMS4xLDIuNDgsMi40MiwyLjQ4czIuNDEtMS4xMiwyLjQxLTIuNTEgICAgUzUzLjQsNy45OCw1Mi4wOCw3Ljk4eiBNNTIuMDgsMTEuNzZjLTAuNjMsMC0xLjE0LTAuNTYtMS4xNy0xLjI1di0wLjA0YzAuMDEtMC42OSwwLjU0LTEuMjUsMS4xNy0xLjI1YzAuNjMsMCwxLjE3LDAuNTgsMS4xNywxLjI3ICAgIFM1Mi43MiwxMS43Niw1Mi4wOCwxMS43NnoiLz4gIDxwYXRoIGNsYXNzPSJzdDAiIHN0eWxlPSJvcGFjaXR5OjAuOTsgZmlsbDogI0ZGRkZGRjsgZW5hYmxlLWJhY2tncm91bmQ6IG5ldzsiIGQ9Ik0zNi4wOCwxNC4yNGMwLDAuMTMtMC4xLDAuMjMtMC4yMywwLjIzaC0xLjQxYy0wLjEzLDAtMC4yMy0wLjExLTAuMjMtMC4yM1Y5LjY4YzAtMC45OC0wLjc0LTEuNzEtMS42Mi0xLjcxICAgIGMtMC44LDAtMS40NiwwLjctMS41OSwxLjYybDAuMDEsNC42NmMwLDAuMTMtMC4xMSwwLjIzLTAuMjMsMC4yM2gtMS40MWMtMC4xMywwLTAuMjMtMC4xMS0wLjIzLTAuMjNWOS42OCAgICBjMC0wLjk4LTAuNzQtMS43MS0xLjYyLTEuNzFjLTAuODUsMC0xLjU0LDAuNzktMS42LDEuOHY0LjQ4YzAsMC4xMy0wLjEsMC4yMy0wLjIzLDAuMjNoLTEuNGMtMC4xMywwLTAuMjMtMC4xMS0wLjIzLTAuMjNWNi43NCAgICBjMC4wMS0wLjEzLDAuMS0wLjIyLDAuMjMtMC4yMmgxLjRjMC4xMywwLDAuMjIsMC4xMSwwLjIzLDAuMjJWNy40YzAuNS0wLjY4LDEuMy0xLjA5LDIuMTYtMS4xaDAuMDNjMS4wOSwwLDIuMDksMC42LDIuNiwxLjU1ICAgIGMwLjQ1LTAuOTUsMS40LTEuNTUsMi40NC0xLjU2YzEuNjIsMCwyLjkzLDEuMjUsMi45LDIuNzhMMzYuMDgsMTQuMjR6Ii8+ICA8cGF0aCBjbGFzcz0ic3QxIiBzdHlsZT0ib3BhY2l0eTowLjM1OyBlbmFibGUtYmFja2dyb3VuZDpuZXc7IiBkPSJNODQuMzQsMTMuNTlsLTAuMDctMC4xM2wtMS45Ni0yLjk5bDEuOTQtMi45NWMwLjQ0LTAuNjcsMC4yNi0xLjU2LTAuNDEtMi4wMmMtMC4wMiwwLTAuMDMsMC0wLjA0LTAuMDEgICAgYy0wLjIzLTAuMTUtMC41LTAuMjItMC43OC0wLjIyaC0xLjYxYy0wLjU2LDAtMS4wOCwwLjI5LTEuMzcsMC43OEw3OS43Miw2LjZsLTAuMzQtMC41NkM3OS4wOSw1LjU2LDc4LjU3LDUuMjcsNzgsNS4yN2gtMS42ICAgIGMtMC42LDAtMS4xMywwLjM3LTEuMzUsMC45MmMtMi4xOS0xLjY2LTUuMjgtMS40Ny03LjI2LDAuNDVjLTAuMzUsMC4zNC0wLjY1LDAuNzItMC44OSwxLjE0Yy0wLjktMS42Mi0yLjU4LTIuNzItNC41LTIuNzIgICAgYy0wLjUsMC0xLjAxLDAuMDctMS40OCwwLjIzVjMuNTFjMC0wLjgyLTAuNjYtMS40OC0xLjQ3LTEuNDhoLTEuNGMtMC44MSwwLTEuNDcsMC42Ni0xLjQ3LDEuNDd2My43NSAgICBjLTAuOTUtMS4zNi0yLjUtMi4xOC00LjE3LTIuMTljLTAuNzQsMC0xLjQ2LDAuMTYtMi4xMiwwLjQ3Yy0wLjI0LTAuMTctMC41NC0wLjI2LTAuODQtMC4yNmgtMS40Yy0wLjQ1LDAtMC44NywwLjIxLTEuMTUsMC41NiAgICBjLTAuMDItMC4wMy0wLjA0LTAuMDUtMC4wNy0wLjA4Yy0wLjI4LTAuMy0wLjY4LTAuNDctMS4wOS0wLjQ3aC0xLjM5Yy0wLjMsMC0wLjYsMC4wOS0wLjg0LDAuMjZjLTAuNjctMC4zLTEuMzktMC40Ni0yLjEyLTAuNDYgICAgYy0xLjgzLDAtMy40MywxLTQuMzcsMi41Yy0wLjItMC40Ni0wLjQ4LTAuODktMC44My0xLjI1Yy0wLjgtMC44MS0xLjg5LTEuMjUtMy4wMi0xLjI1aC0wLjAxYy0wLjg5LDAuMDEtMS43NSwwLjMzLTIuNDYsMC44OCAgICBjLTAuNzQtMC41Ny0xLjY0LTAuODgtMi41Ny0wLjg4SDI4LjFjLTAuMjksMC0wLjU4LDAuMDMtMC44NiwwLjExYy0wLjI4LDAuMDYtMC41NiwwLjE2LTAuODIsMC4yOGMtMC4yMS0wLjEyLTAuNDUtMC4xOC0wLjctMC4xOCAgICBoLTEuNGMtMC44MiwwLTEuNDcsMC42Ni0xLjQ3LDEuNDd2Ny41YzAsMC44MiwwLjY2LDEuNDcsMS40NywxLjQ3aDEuNGMwLjgyLDAsMS40OC0wLjY2LDEuNDgtMS40OGwwLDBWOS43OSAgICBjMC4wMy0wLjM2LDAuMjMtMC41OSwwLjM2LTAuNTljMC4xOCwwLDAuMzgsMC4xOCwwLjM4LDAuNDd2NC41N2MwLDAuODIsMC42NiwxLjQ3LDEuNDcsMS40N2gxLjQxYzAuODIsMCwxLjQ3LTAuNjYsMS40Ny0xLjQ3ICAgIGwtMC4wMS00LjU3YzAuMDYtMC4zMiwwLjI1LTAuNDcsMC4zNS0wLjQ3YzAuMTgsMCwwLjM4LDAuMTgsMC4zOCwwLjQ3djQuNTdjMCwwLjgyLDAuNjYsMS40NywxLjQ3LDEuNDdoMS40MSAgICBjMC44MiwwLDEuNDctMC42NiwxLjQ3LTEuNDd2LTAuMzhjMC45NiwxLjI5LDIuNDYsMi4wNiw0LjA2LDIuMDZjMC43NCwwLDEuNDYtMC4xNiwyLjEyLTAuNDdjMC4yNCwwLjE3LDAuNTQsMC4yNiwwLjg0LDAuMjZoMS4zOSAgICBjMC4zLDAsMC42LTAuMDksMC44NC0wLjI2djIuMDFjMCwwLjgyLDAuNjYsMS40NywxLjQ3LDEuNDdoMS40YzAuODIsMCwxLjQ3LTAuNjYsMS40Ny0xLjQ3di0xLjc3YzAuNDgsMC4xNSwwLjk5LDAuMjMsMS40OSwwLjIyICAgIGMxLjcsMCwzLjIyLTAuODcsNC4xNy0yLjJ2MC41MmMwLDAuODIsMC42NiwxLjQ3LDEuNDcsMS40N2gxLjRjMC4zLDAsMC42LTAuMDksMC44NC0wLjI2YzAuNjYsMC4zMSwxLjM5LDAuNDcsMi4xMiwwLjQ3ICAgIGMxLjkyLDAsMy42LTEuMSw0LjQ5LTIuNzNjMS41NCwyLjY1LDQuOTUsMy41Myw3LjU4LDEuOThjMC4xOC0wLjExLDAuMzYtMC4yMiwwLjUzLTAuMzZjMC4yMiwwLjU1LDAuNzYsMC45MSwxLjM1LDAuOUg3OCAgICBjMC41NiwwLDEuMDgtMC4yOSwxLjM3LTAuNzhsMC4zNy0wLjYxbDAuMzcsMC42MWMwLjI5LDAuNDgsMC44MSwwLjc4LDEuMzgsMC43OGgxLjZjMC44MSwwLDEuNDYtMC42NiwxLjQ1LTEuNDYgICAgQzg0LjQ5LDE0LjAyLDg0LjQ0LDEzLjgsODQuMzQsMTMuNTlMODQuMzQsMTMuNTl6IE0zNS44NiwxNC40N2gtMS40MWMtMC4xMywwLTAuMjMtMC4xMS0wLjIzLTAuMjNWOS42OCAgICBjMC0wLjk4LTAuNzQtMS43MS0xLjYyLTEuNzFjLTAuOCwwLTEuNDYsMC43LTEuNTksMS42MmwwLjAxLDQuNjZjMCwwLjEzLTAuMSwwLjIzLTAuMjMsMC4yM2gtMS40MWMtMC4xMywwLTAuMjMtMC4xMS0wLjIzLTAuMjMgICAgVjkuNjhjMC0wLjk4LTAuNzQtMS43MS0xLjYyLTEuNzFjLTAuODUsMC0xLjU0LDAuNzktMS42LDEuOHY0LjQ4YzAsMC4xMy0wLjEsMC4yMy0wLjIzLDAuMjNoLTEuNGMtMC4xMywwLTAuMjMtMC4xMS0wLjIzLTAuMjMgICAgVjYuNzRjMC4wMS0wLjEzLDAuMTEtMC4yMiwwLjIzLTAuMjJoMS40YzAuMTMsMCwwLjIyLDAuMTEsMC4yMywwLjIyVjcuNGMwLjUtMC42OCwxLjMtMS4wOSwyLjE2LTEuMWgwLjAzICAgIGMxLjA5LDAsMi4wOSwwLjYsMi42LDEuNTVjMC40NS0wLjk1LDEuNC0xLjU1LDIuNDQtMS41NmMxLjYyLDAsMi45MywxLjI1LDIuOSwyLjc4bDAuMDEsNS4xNkMzNi4wOSwxNC4zNiwzNS45OCwxNC40NiwzNS44NiwxNC40NyAgICBMMzUuODYsMTQuNDd6IE00NS45NywxNC4yNGMwLDAuMTMtMC4xLDAuMjMtMC4yMywwLjIzaC0xLjRjLTAuMTMsMC0wLjIzLTAuMTEtMC4yMy0wLjIzVjEzLjVjLTAuNywwLjc2LTEuNjksMS4xOC0yLjcyLDEuMTggICAgYy0yLjE3LDAtMy45NC0xLjg3LTMuOTQtNC4xOXMxLjc3LTQuMTksMy45NC00LjE5YzEuMDMsMCwyLjAyLDAuNDMsMi43MywxLjE4VjYuNzRjMC0wLjEzLDAuMS0wLjIzLDAuMjMtMC4yM2gxLjQgICAgYzAuMTItMC4wMSwwLjIyLDAuMDgsMC4yMywwLjIxYzAsMC4wMSwwLDAuMDEsMCwwLjAydjcuNTFoLTAuMDFWMTQuMjR6IE01Mi40MSwxNC42N2MtMS4wMywwLTIuMDItMC40My0yLjczLTEuMTh2My45NyAgICBjMCwwLjEzLTAuMSwwLjIzLTAuMjMsMC4yM2gtMS40Yy0wLjEzLDAtMC4yMy0wLjEtMC4yMy0wLjIzVjYuNzVjMC0wLjEzLDAuMS0wLjIyLDAuMjMtMC4yMmgxLjRjMC4xMywwLDAuMjMsMC4xMSwwLjIzLDAuMjN2MC43MyAgICBjMC43MS0wLjc2LDEuNy0xLjE4LDIuNzMtMS4xOGMyLjE3LDAsMy45NCwxLjg2LDMuOTQsNC4xOFM1NC41OCwxNC42Nyw1Mi40MSwxNC42N3ogTTY2LjI0LDExLjM5Yy0wLjM5LDEuODctMS45NiwzLjI5LTMuODQsMy4yOSAgICBjLTEuMDMsMC0yLjAyLTAuNDMtMi43My0xLjE4djAuNzNjMCwwLjEzLTAuMSwwLjIzLTAuMjMsMC4yM2gtMS40Yy0wLjEzLDAtMC4yMy0wLjExLTAuMjMtMC4yM1YzLjUxYzAtMC4xMywwLjEtMC4yMywwLjIzLTAuMjMgICAgaDEuNGMwLjEzLDAsMC4yMywwLjExLDAuMjMsMC4yM3YzLjk3YzAuNzEtMC43NSwxLjctMS4xOCwyLjczLTEuMTdjMS44OCwwLDMuNDUsMS40LDMuODQsMy4yOEM2Ni4zNywxMC4xOSw2Ni4zNywxMC44LDY2LjI0LDExLjM5ICAgIEw2Ni4yNCwxMS4zOUw2Ni4yNCwxMS4zOXogTTcxLjY3LDE0LjY4Yy0yLDAuMDEtMy43My0xLjM1LTQuMTctMy4zYy0wLjEzLTAuNTktMC4xMy0xLjE5LDAtMS43N2MwLjQ0LTEuOTQsMi4xNy0zLjMxLDQuMTctMy4zICAgIGMyLjM2LDAsNC4yNiwxLjg3LDQuMjYsNC4xOVM3NC4wMywxNC42OCw3MS42NywxNC42OEw3MS42NywxNC42OHogTTgzLjA0LDE0LjQ3aC0xLjYxYy0wLjEzLDAtMC4yNC0wLjA2LTAuMy0wLjE3bC0xLjQ0LTIuMzkgICAgbC0xLjQ0LDIuMzljLTAuMDYsMC4xMS0wLjE4LDAuMTctMC4zLDAuMTdoLTEuNjFjLTAuMDQsMC0wLjA4LTAuMDEtMC4xMi0wLjAzYy0wLjA5LTAuMDYtMC4xMy0wLjE5LTAuMDYtMC4yOGwwLDBsMi40My0zLjY4ICAgIEw3Ni4yLDYuODRjLTAuMDItMC4wMy0wLjAzLTAuMDctMC4wMy0wLjEyYzAtMC4xMiwwLjA5LTAuMjEsMC4yMS0wLjIxaDEuNjFjMC4xMywwLDAuMjQsMC4wNiwwLjMsMC4xN2wxLjQxLDIuMzZsMS40MS0yLjM2ICAgIGMwLjA2LTAuMTEsMC4xOC0wLjE3LDAuMy0wLjE3aDEuNjFjMC4wNCwwLDAuMDgsMC4wMSwwLjEyLDAuMDNjMC4wOSwwLjA2LDAuMTMsMC4xOSwwLjA2LDAuMjhsMCwwbC0yLjM4LDMuNjRsMi40MywzLjY3ICAgIGMwLjAyLDAuMDMsMC4wMywwLjA3LDAuMDMsMC4xMkM4My4yNSwxNC4zOCw4My4xNiwxNC40Nyw4My4wNCwxNC40N0w4My4wNCwxNC40N0w4My4wNCwxNC40N3oiLz4gIDxwYXRoIGNsYXNzPSJzdDAiIHN0eWxlPSJvcGFjaXR5OjAuOTsgZmlsbDogI0ZGRkZGRjsgZW5hYmxlLWJhY2tncm91bmQ6IG5ldzsiIGQ9Ik0xMC41LDEuMjRjLTUuMTEsMC05LjI1LDQuMTUtOS4yNSw5LjI1czQuMTUsOS4yNSw5LjI1LDkuMjVzOS4yNS00LjE1LDkuMjUtOS4yNSAgICBDMTkuNzUsNS4zOCwxNS42MSwxLjI0LDEwLjUsMS4yNHogTTE0Ljg5LDEyLjc3Yy0xLjkzLDEuOTMtNC43OCwyLjMxLTYuNywyLjMxYy0wLjcsMC0xLjQxLTAuMDUtMi4xLTAuMTZjMCwwLTEuMDItNS42NCwyLjE0LTguODEgICAgYzAuODMtMC44MywxLjk1LTEuMjgsMy4xMy0xLjI4YzEuMjcsMCwyLjQ5LDAuNTEsMy4zOSwxLjQyQzE2LjU5LDguMDksMTYuNjQsMTEsMTQuODksMTIuNzd6Ii8+ICA8cGF0aCBjbGFzcz0ic3QxIiBzdHlsZT0ib3BhY2l0eTowLjM1OyBlbmFibGUtYmFja2dyb3VuZDpuZXc7IiBkPSJNMTAuNS0wLjAxQzQuNy0wLjAxLDAsNC43LDAsMTAuNDlzNC43LDEwLjUsMTAuNSwxMC41UzIxLDE2LjI5LDIxLDEwLjQ5QzIwLjk5LDQuNywxNi4zLTAuMDEsMTAuNS0wLjAxeiAgICAgTTEwLjUsMTkuNzRjLTUuMTEsMC05LjI1LTQuMTUtOS4yNS05LjI1czQuMTQtOS4yNiw5LjI1LTkuMjZzOS4yNSw0LjE1LDkuMjUsOS4yNUMxOS43NSwxNS42MSwxNS42MSwxOS43NCwxMC41LDE5Ljc0eiIvPiAgPHBhdGggY2xhc3M9InN0MSIgc3R5bGU9Im9wYWNpdHk6MC4zNTsgZW5hYmxlLWJhY2tncm91bmQ6bmV3OyIgZD0iTTE0Ljc0LDYuMjVDMTIuOSw0LjQxLDkuOTgsNC4zNSw4LjIzLDYuMWMtMy4xNiwzLjE3LTIuMTQsOC44MS0yLjE0LDguODFzNS42NCwxLjAyLDguODEtMi4xNCAgICBDMTYuNjQsMTEsMTYuNTksOC4wOSwxNC43NCw2LjI1eiBNMTIuNDcsMTAuMzRsLTAuOTEsMS44N2wtMC45LTEuODdMOC44LDkuNDNsMS44Ni0wLjlsMC45LTEuODdsMC45MSwxLjg3bDEuODYsMC45TDEyLjQ3LDEwLjM0eiIgICAgLz4gIDxwb2x5Z29uIGNsYXNzPSJzdDAiIHN0eWxlPSJvcGFjaXR5OjAuOTsgZmlsbDogI0ZGRkZGRjsgZW5hYmxlLWJhY2tncm91bmQ6IG5ldzsiIHBvaW50cz0iMTQuMzMsOS40MyAxMi40NywxMC4zNCAxMS41NiwxMi4yMSAxMC42NiwxMC4zNCA4LjgsOS40MyAxMC42Niw4LjUzIDExLjU2LDYuNjYgMTIuNDcsOC41MyAgICIvPjwvZz48L3N2Zz4=);
    }

    .mapboxgl-ctrl.mapboxgl-ctrl-attrib {
        padding: 0 5px;
        background-color: rgba(255, 255, 255, .5);
        margin: 0;
    }
    .mapboxgl-ctrl-attrib.mapboxgl-compact {
        padding-top: 2px;
        padding-bottom: 2px;
        margin: 0 10px 10px 10px;
        position: relative;
        padding-right: 24px;
        background-color: #fff;
        border-radius: 3px 12px 12px 3px;
        visibility: hidden;
    }
    .mapboxgl-ctrl-attrib.mapboxgl-compact:hover {
        visibility: visible;
    }
    .mapboxgl-ctrl-attrib.mapboxgl-compact:after {
        content: '';
        cursor: pointer;
        position: absolute;
        bottom: 0;
        right: 0;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%0D%0A%09%3Cpath%20fill%3D%27%23333333%27%20fill-rule%3D%27evenodd%27%20d%3D%27M4%2C10a6%2C6%200%201%2C0%2012%2C0a6%2C6%200%201%2C0%20-12%2C0%20M9%2C7a1%2C1%200%201%2C0%202%2C0a1%2C1%200%201%2C0%20-2%2C0%20M9%2C10a1%2C1%200%201%2C1%202%2C0l0%2C3a1%2C1%200%201%2C1%20-2%2C0%27%20%2F%3E%0D%0A%3C%2Fsvg%3E");
        background-color: rgba(255, 255, 255, .5);
        width: 24px;
        height: 24px;
        box-sizing: border-box;
        visibility: visible;
        border-radius: 12px;
    }
    .mapboxgl-ctrl-attrib a {
        color: rgba(0,0,0,0.75);
        text-decoration: none;
    }
    .mapboxgl-ctrl-attrib a:hover {
        color: inherit;
        text-decoration: underline;
    }
    /* stylelint-disable */
    .mapboxgl-ctrl-attrib .mapbox-improve-map {
        font-weight: bold;
        margin-left: 2px;
    }
    /*stylelint-enable*/
    .mapboxgl-ctrl-scale {
        background-color: rgba(255,255,255,0.75);
        font-size: 10px;
        border-width: medium 2px 2px;
        border-style: none solid solid;
        border-color: #333;
        padding: 0 5px;
        color: #333;
    }

    .mapboxgl-popup {
        position: absolute;
        top: 0;
        left: 0;
        display: -webkit-flex;
        display: flex;
        will-change: transform;
        pointer-events: none;
    }
    .mapboxgl-popup-anchor-top,
    .mapboxgl-popup-anchor-top-left,
    .mapboxgl-popup-anchor-top-right {
        -webkit-flex-direction: column;
        flex-direction: column;
    }
    .mapboxgl-popup-anchor-bottom,
    .mapboxgl-popup-anchor-bottom-left,
    .mapboxgl-popup-anchor-bottom-right {
        -webkit-flex-direction: column-reverse;
        flex-direction: column-reverse;
    }
    .mapboxgl-popup-anchor-left {
        -webkit-flex-direction: row;
        flex-direction: row;
    }
    .mapboxgl-popup-anchor-right {
        -webkit-flex-direction: row-reverse;
        flex-direction: row-reverse;
    }
    .mapboxgl-popup-tip {
        width: 0;
        height: 0;
        border: 10px solid transparent;
        z-index: 1;
    }
    .mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
        -webkit-align-self: center;
        align-self: center;
        border-top: none;
        border-bottom-color: #fff;
    }
    .mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip {
        -webkit-align-self: flex-start;
        align-self: flex-start;
        border-top: none;
        border-left: none;
        border-bottom-color: #fff;
    }
    .mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {
        -webkit-align-self: flex-end;
        align-self: flex-end;
        border-top: none;
        border-right: none;
        border-bottom-color: #fff;
    }
    .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
        -webkit-align-self: center;
        align-self: center;
        border-bottom: none;
        border-top-color: #fff;
    }
    .mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip {
        -webkit-align-self: flex-start;
        align-self: flex-start;
        border-bottom: none;
        border-left: none;
        border-top-color: #fff;
    }
    .mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {
        -webkit-align-self: flex-end;
        align-self: flex-end;
        border-bottom: none;
        border-right: none;
        border-top-color: #fff;
    }
    .mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
        -webkit-align-self: center;
        align-self: center;
        border-left: none;
        border-right-color: #fff;
    }
    .mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
        -webkit-align-self: center;
        align-self: center;
        border-right: none;
        border-left-color: #fff;
    }
    .mapboxgl-popup-close-button {
        position: absolute;
        right: 0;
        top: 0;
        border: none;
        border-radius: 0 3px 0 0;
        cursor: pointer;
        background-color: rgba(0,0,0,0);
    }
    .mapboxgl-popup-close-button:hover {
        background-color: rgba(0,0,0,0.05);
    }
    .mapboxgl-popup-content {
        position: relative;
        background: #fff;
        border-radius: 3px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.10);
        padding: 10px 10px 15px;
        pointer-events: auto;
    }
    .mapboxgl-popup-anchor-top-left .mapboxgl-popup-content {
        border-top-left-radius: 0;
    }
    .mapboxgl-popup-anchor-top-right .mapboxgl-popup-content {
        border-top-right-radius: 0;
    }
    .mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-content {
        border-bottom-left-radius: 0;
    }
    .mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-content {
        border-bottom-right-radius: 0;
    }

    .mapboxgl-marker {
        position: absolute;
        top: 0;
        left: 0;
        will-change: transform;
    }

    .mapboxgl-user-location-dot {
        background-color: #1DA1F2;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        box-shadow: 0 0 2px rgba(0,0,0,0.25);
        border: 2px solid #fff;
    }
    .mapboxgl-user-location-dot:after {
        content: '';
        display: block;
        box-shadow: #1DA1F2 0 0 0 2px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        position: relative;
        z-index: -1;

        -webkit-animation: mapboxgl-user-location-dot-pulse 2s;
        -moz-animation: mapboxgl-user-location-dot-pulse 2s;
        -ms-animation: mapboxgl-user-location-dot-pulse 2s;
        animation: mapboxgl-user-location-dot-pulse 2s;

        -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
        -ms-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
    }
    @-webkit-keyframes mapboxgl-user-location-dot-pulse {
        0%   {   -webkit-box-shadow: 0 0 0 0 rgba(29, 161, 242, 0.8); }
        70%  {   -webkit-box-shadow: 0 0 0 15px rgba(29, 161, 242, 0); }
        242% {   -webkit-box-shadow: 0 0 0 0 rgba(29, 161, 242, 0); }
    }
    @-ms-keyframes mapboxgl-user-location-dot-pulse {
        0%   {   -ms-box-shadow: 0 0 0 0 rgba(29, 161, 242, 0.8); }
        70%  {   -ms-box-shadow: 0 0 0 15px rgba(29, 161, 242, 0); }
        242% {   -ms-box-shadow: 0 0 0 0 rgba(29, 161, 242, 0); }
    }
    @keyframes mapboxgl-user-location-dot-pulse {
        0% {
            -moz-box-shadow: 0 0 0 0 rgba(29, 161, 242, 0.8);
                box-shadow: 0 0 0 0 rgba(29, 161, 242, 0.4);
        }
        70% {
            -moz-box-shadow: 0 0 0 15px rgba(29, 161, 242, 0);
                box-shadow: 0 0 0 15px rgba(29, 161, 242, 0);
        }
        100% {
            -moz-box-shadow: 0 0 0 0 rgba(29, 161, 242, 0);
                box-shadow: 0 0 0 0 rgba(29, 161, 242, 0);
        }
    }
    .mapboxgl-user-location-dot-stale {
        background-color: #aaa;
    }
    .mapboxgl-user-location-dot-stale:after {
        display: none
    }

    .mapboxgl-crosshair,
    .mapboxgl-crosshair .mapboxgl-interactive,
    .mapboxgl-crosshair .mapboxgl-interactive:active {
        cursor: crosshair;
    }
    .mapboxgl-boxzoom {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        background: #fff;
        border: 2px dotted #202020;
        opacity: 0.5;
    }

    @media print {
    /* stylelint-disable */
        .mapbox-improve-map {
            display:none;
        }
    /* stylelint-enable */
    }
`