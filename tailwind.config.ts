export default {
    theme: {
        extend: {
            keyframes: {
                // Progress bar animation
                progress: {
                    '0%': { width: '0%' },
                    '100%': { width: '100%' },
                },
                // Dropdown animation
                'dropdown-in': {
                    '0%': { opacity: '0', transform: 'translateY(-8px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            },
            animation: {
                progress: 'progress linear forwards',
                'dropdown-in': 'dropdown-in 0.15s ease-out',
            }
        }
    }
}