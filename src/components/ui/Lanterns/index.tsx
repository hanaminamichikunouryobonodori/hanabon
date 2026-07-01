import styles from './lanterns.module.scss';

const LANTERNS = [
  { left: '3%', size: 'clamp(52px, 10vw,  96px)', delay: 0, color: '#CC2200' },
  { left: '12%', size: 'clamp(38px, 7.8vw, 72px)', delay: 0.5, color: '#CC6600' },
  { left: '20%', size: 'clamp(44px, 8.8vw, 82px)', delay: 1.1, color: '#CC2200' },
  { left: '72%', size: 'clamp(44px, 8.8vw, 82px)', delay: 0.3, color: '#CC6600' },
  { left: '82%', size: 'clamp(38px, 7.8vw, 72px)', delay: 0.8, color: '#CC2200' },
  { left: '91%', size: 'clamp(52px, 10vw,  96px)', delay: 0.15, color: '#CC6600' },
];

const LanternSvg = ({ color }: { color: string }) => (
  <svg fill='none' viewBox='0 0 50 72' xmlns='http://www.w3.org/2000/svg'>
    {/* 紐 */}
    <line stroke='#8B6914' strokeWidth='1.5' x1='25' x2='25' y1='0' y2='13' />
    {/* 上キャップ */}
    <rect fill='#D4A017' height='5' rx='2' width='26' x='12' y='13' />
    {/* 本体 */}
    <ellipse cx='25' cy='38' fill={color} rx='22' ry='20' />
    {/* 光の反射 */}
    <ellipse cx='16' cy='30' fill='rgba(255,255,255,0.18)' rx='7' ry='8' />
    {/* 横筋 */}
    <ellipse cx='25' cy='29' fill='rgba(0,0,0,0.12)' rx='22' ry='2.5' />
    <ellipse cx='25' cy='38' fill='rgba(0,0,0,0.12)' rx='22' ry='2.5' />
    <ellipse cx='25' cy='47' fill='rgba(0,0,0,0.12)' rx='22' ry='2.5' />
    {/* 下キャップ */}
    <rect fill='#D4A017' height='5' rx='2' width='26' x='12' y='58' />
    {/* 房 */}
    <line stroke='#D4A017' strokeWidth='1.5' x1='25' x2='25' y1='63' y2='70' />
    <line stroke='#D4A017' strokeWidth='1' x1='21' x2='20' y1='64' y2='72' />
    <line stroke='#D4A017' strokeWidth='1' x1='29' x2='30' y1='64' y2='72' />
  </svg>
);

const Lanterns = () => (
  <div aria-hidden='true' className={styles.wrapper}>
    {LANTERNS.map((l, i) => (
      <div
        className={styles.lantern}
        key={i}
        style={{ left: l.left, width: l.size as string, animationDelay: `${l.delay}s` }}
      >
        <LanternSvg color={l.color} />
      </div>
    ))}
  </div>
);

export default Lanterns;
