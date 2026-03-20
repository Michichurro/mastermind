import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig, Sequence } from 'remotion';

const LOGOS = [
    'adidas.png',
    'apple.png',
    'bmw.png',
    'coca-cola.png',
    'disney.png',
    'google.png', // Wait, google wasn't in the list, I should stick to the list.
    'ford.png',
    'lego.png',
    'louisvuitton.png',
    'mastercard.png',
    'mercedes-benz.png',
    'microsoft.png',
    'nike.png',
    'nintendo.png',
    'pepsi.png', // Check list
    'rolex.png',
    'starbucks.png', // Check list
    'tesla.png',
    'visa.png',
    'volvo.png',
];

// Computed from the file list I saw earlier to ensure they exist.
const VALID_LOGOS = [
    'adidas.png',
    'apple.png',
    'bmw.png',
    'coca-cola.png',
    'disney.png',
    'ford.png',
    'lego.png',
    'louisvuitton.png',
    'mastercard.png',
    'mercedes-benz.png',
    'microsoft.png',
    'nike.png',
    'nintendo.png',
    'rolex.png',
    'tesla.png',
    'visa.png',
    'volvo.png',
    'fanta.png',
    'fedex.png',
    'gap.png'
];

const LogoSlide = ({ filename }: { filename: string }) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    // Subtle Ken Burns scale effect
    const scale = interpolate(frame, [0, durationInFrames], [1, 1.1], {
        extrapolateRight: 'clamp',
    });

    // Soft Fade In and Out
    const opacity = interpolate(
        frame,
        [0, 15, durationInFrames - 15, durationInFrames],
        [0, 1, 1, 0]
    );

    return (
        <AbsoluteFill
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
            }}
        >
            <div style={{ opacity, transform: `scale(${scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Img
                    src={staticFile(`/images/logos/${filename}`)}
                    style={{
                        height: 200,
                        objectFit: 'contain',
                    }}
                />
                <h2 style={{
                    fontFamily: 'sans-serif',
                    marginTop: 40,
                    color: '#333',
                    fontSize: 40,
                    fontWeight: 300,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                }}>
                    {filename.replace('.png', '').replace('-', ' ')}
                </h2>
            </div>
        </AbsoluteFill>
    );
};

export const LogoShowcase = () => {
    const slideDuration = 90; // 3 seconds at 30fps

    return (
        <AbsoluteFill style={{ backgroundColor: 'white' }}>
            {VALID_LOGOS.map((logo, index) => {
                return (
                    <Sequence key={logo} from={index * slideDuration} durationInFrames={slideDuration}>
                        <LogoSlide filename={logo} />
                    </Sequence>
                )
            })}
        </AbsoluteFill>
    );
};
