import type { Metadata } from 'next';
import Image from 'next/image';
import ripcityImage from '../../logo/ripcity.png';
import fkrnbananaImage from '../../logo/fkrnbanana.png';
import piratesbonazaImage from '../../logo/Piratesbonaza.png';
import sixsixsixImage from '../../logo/sixsixsix.png';
import slayerincImage from '../../logo/slayerinc.png';
import sweetbonanza1000Image from '../../logo/sweetbonanza1000.png';
import gatesx1000Image from '../../logo/gatesx1000.png';
import bigbasschristmasImage from '../../logo/bigbasschristmas.png';

export const metadata: Metadata = {
  title: 'Challenges'
};

export default function ChallengesPage() {
  const challenges = [
   
   {
      name: 'PIRATES BONANZA',
      description: 'AWL WAHD YDRB DRIBA DIAL 500× min $0.20 bet',
      prize: '$100',
      createdBy: 'drepop',
      image: piratesbonazaImage,
      link: 'https://shuffle.com/games/hacksaw-pirate-bonanza-96'
    },
    {
      name: 'SLAYER INC',
      description: 'AWL WAHD YDRB DRIBA DIAL 500× min $0.20 bet',
      prize: '$100',
      createdBy: 'drepop',
      image: slayerincImage,
      link: 'https://shuffle.com/games/hacksaw-slayers-inc-96'
    },
    {
      name: 'SWEET BONANZA X1000',
      description: 'AWL WAHD YDRB DRIBA DIAL 500× min $0.20 bet',
      prize: '$100',
      createdBy: 'drepop',
      image: sweetbonanza1000Image,
      link: 'https://shuffle.com/games/pragmaticexternal-sweet-bonanza-1000'
    },
    {
      name: 'GATES OF OLYMPUS X1000',
      description: 'AWL WAHD YDRB DRIBA DIAL 500× min $0.20 bet',
      prize: '$100',
      createdBy: 'drepop',
      image: gatesx1000Image,
      link: 'https://shuffle.com/games/pragmaticexternal-gatesof-olympus-1000'
    },
    {
      name: 'FKRN BANANAS',
      description: 'AWL WAHD YDRB DRIBA DIAL 500× min $0.20 bet',
      prize: '$100',
      createdBy: 'drepop',
      image: fkrnbananaImage,
      link: 'https://shuffle.com/games/hacksaw-frkn-bananas-96'
    },
    {
      name: 'BIG BASS CHRISTMAS - FROZEN LAKE',
      description: 'AWL WAHD YDRB DRIBA DIAL 500× min $0.20 bet',
      prize: '$100',
      createdBy: 'drepop',
      image: bigbasschristmasImage,
      link: 'https://shuffle.com/games/pragmaticplay-big-bass-christmas-frozen-lake'
    },
    
  ];

  return (
    <section className="relative space-y-8">
      <div className="space-y-3">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-[#ffd86f] via-[#ffb347] to-[#f9a825] text-transparent bg-clip-text drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
        >
          CHALLENGES
        </h1>
        <p className="text-sm sm:text-base text-white/70 max-w-2xl">
          𝐒𝐥𝐨𝐭𝐬 𝐂𝐡𝐚𝐥𝐥𝐞𝐧𝐠𝐞𝐬 , 𝐋𝐢 𝐰𝐬𝐥 𝐥𝐝𝐤 𝐝𝐫𝐢𝐛𝐚 𝐥𝐢 𝐝𝐚𝐲𝐫𝐢𝐧 𝐟 𝐜𝐨𝐧𝐝𝐢𝐭𝐢𝐨𝐧𝐬 𝐲 𝐜𝐫𝐞𝐞 𝐭𝐢𝐜𝐤𝐞𝐭 𝐟 𝐝𝐢𝐬𝐜𝐨𝐫𝐝 𝐨 𝐚𝐲𝐚𝐤𝐡𝐮𝐝 𝐝𝐤 𝐩𝐫𝐢𝐳𝐞𝐬 .
        </p>
         <p className="text-sm sm:text-base text-white/70 max-w-2xl">
          Note: NO BONUS BUY , GA3 CURRENCIES MSMO7 BIHA MACHI MOCHKIL. GOOD LUCK.
          CLICKI FHAD LINK BACH TCHOF CHALLENGES LIVE , AY SLOT FIH CREATOR 'drepop' RA DIALNA .
        </p>
        <a
          href="https://shuffle.com/challenges"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#ffd86f] text-black font-semibold text-sm sm:text-base px-5 sm:px-6 py-2.5 shadow-[0_10px_25px_rgba(0,0,0,0.6)] hover:bg-[#ffe28f] transition-colors"
        >
          <span>CLICK HERE</span>
        </a>
      </div>

      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {challenges.map((challenge) => (
          <div
            key={`${challenge.name}-${challenge.prize}`}
            className="flex flex-col rounded-xl overflow-hidden bg-[#131313] border border-white/5 shadow-[0_10px_30px_rgba(147,51,234,0.55)]"
          >
            {challenge.link ? (
              <a
                href={challenge.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative h-40 sm:h-48 w-full">
                  <Image
                    src={challenge.image}
                    alt={challenge.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </a>
            ) : (
              <div className="relative h-40 sm:h-48 w-full">
                <Image
                  src={challenge.image}
                  alt={challenge.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="flex-1 px-4 py-4 space-y-2 text-sm text-white/80">
              <div className="font-semibold text-base text-white">
                {challenge.name}
              </div>
              <div className="text-[11px] sm:text-xs text-white/70 leading-snug">
                {challenge.description}
              </div>

              <div className="mt-2 space-y-1 text-[11px] sm:text-xs">
                <div className="text-white/60">Prize</div>
                <div className="font-semibold text-[#facc15] text-sm">
                  {challenge.prize}
                </div>
              </div>

              <div className="mt-2 space-y-1 text-[11px] sm:text-xs">
                <div className="text-white/60">Created By</div>
                <div className="flex items-center gap-1.5 text-white/80">
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#facc15]/80 text-[10px] text-[#facc15]">★</span>
                  <span>{challenge.createdBy}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
