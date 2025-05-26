import Hero from '@/components/home/Hero'
import OnlineMembers from '@/components/home/OnlineMembers'
import ServerStats from '@/components/home/ServerStats'
import LiveEvents from '@/components/home/LiveEvents'
import CommunityWall from '@/components/home/CommunityWall'
import JoinCTA from '@/components/home/JoinCTA'
import MascotGuide from '@/components/shared/MascotGuide'

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <OnlineMembers />
      <ServerStats />
      <LiveEvents />
      <CommunityWall />
      <JoinCTA />
      <MascotGuide />
    </div>
  );
}