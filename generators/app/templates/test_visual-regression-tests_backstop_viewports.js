// based on comparison of devices on https://mydevice.io/devices/
module.exports = [
    {
        // e.g. iPhone =< 5, Samsung Galaxy =< S3 mini
        "label": "phone small",
        "width": 320,
        "height": 480
    },
    {
        // e.g. Samsung Galaxy >= S3 and Note *, Google Pixel *, Sony Xperia *, most of LG and HTC
        "label": "phone medium",
        "width": 360,
        "height": 640
    },
    {
        // e.g. iPhone 6, 6s, 7, 8, X
        "label": "iphone",
        "width": 375,
        "height": 667
    },
    {
        // e.g. iPhone 6+, 6s+, 7+, 8+
        "label": "iphone plus",
        "width": 414,
        "height": 736
    },
    {
        "label": "phone landscape",
        "width": 640,
        "height": 360
    },
    {
        // e.g. iPad portrait (except Pro != 9.7")
        "label": "tablet",
        "width": 768,
        "height": 1024
    },
    {
        "label": "desktop",
        "width": 1280,
        "height": 800
    }
];
