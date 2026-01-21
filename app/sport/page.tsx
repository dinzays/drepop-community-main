import { Metadata } from 'next';
import SportPageClient from './SportPageClient';

export const metadata: Metadata = {
    title: 'Sports Betting'
};

export default function SportPage() {
    return <SportPageClient />;
}
