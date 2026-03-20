import { Composition } from 'remotion';
import { LogoShowcase } from './LogoShowcase';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="LogoShowcase"
                component={LogoShowcase}
                durationInFrames={20 * 90} // 20 logos * 90 frames each
                fps={30}
                width={1080}
                height={1920} // Instagram Story format (9:16) implies 1080x1920. User asked for "Social Media".
            />
        </>
    );
};
