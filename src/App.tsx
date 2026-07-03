import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Home,
  Leaf,
  MapPin,
  PackageCheck,
  CircleDollarSign,
  Plus,
  ShieldCheck,
  ShoppingBasket,
  Sprout,
  Truck,
  UserRound,
} from 'lucide-react'

type RoleId = 'buyer' | 'vendor' | 'driver'
type Screen = 'intro' | 'roles' | 'app'
type TabId = 'dashboard' | 'market' | 'orders' | 'impact' | 'profile'

type Role = {
  id: RoleId
  title: string
  label: string
  description: string
  illustration: 'cook' | 'vendor' | 'driver'
}

type ProduceItem = {
  name: string
  vendor: string
  qty: string
  distance: string
  price: string
  oldPrice: string
  freshness: string
  image: string
}

const roles: Role[] = [
  {
    id: 'buyer',
    title: 'Karinderya',
    label: 'Mamimili',
    description: 'Nagluluto para sa komunidad.',
    illustration: 'cook',
  },
  {
    id: 'vendor',
    title: 'Taga-Palengke',
    label: 'Nagbebenta',
    description: 'Nagtitinda ng sariwa at abot-kaya.',
    illustration: 'vendor',
  },
  {
    id: 'driver',
    title: 'Tsuper ng TODA',
    label: 'Tagahatid',
    description: 'Naghahatid ng ani nang mabilis.',
    illustration: 'driver',
  },
]

const produce: ProduceItem[] = [
  {
    name: 'Kamatis',
    vendor: 'Aling Tess',
    qty: '12 kg available',
    distance: '650 m',
    price: '₱38/kg',
    oldPrice: '₱55/kg',
    freshness: '4h good for cooking',
    image: '/produce/kamatis.webp',
  },
  {
    name: 'Talong',
    vendor: 'Mang Rolly',
    qty: '9 kg available',
    distance: '900 m',
    price: '₱45/kg',
    oldPrice: '₱62/kg',
    freshness: '5h shelf window',
    image: '/produce/talong.webp',
  },
  {
    name: 'Repolyo',
    vendor: 'Nena Produce',
    qty: '7 heads available',
    distance: '1.2 km',
    price: '₱52/head',
    oldPrice: '₱70/head',
    freshness: '6h shelf window',
    image: '/produce/repolyo.webp',
  },
]

const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'market', label: 'Ani', icon: ShoppingBasket },
  { id: 'orders', label: 'Order', icon: ClipboardList },
  { id: 'impact', label: 'Kita', icon: Leaf },
  { id: 'profile', label: 'Profile', icon: UserRound },
] satisfies { id: TabId; label: string; icon: typeof Home }[]

function App() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [roleId, setRoleId] = useState<RoleId>('buyer')
  const [tab, setTab] = useState<TabId>('dashboard')

  const role = useMemo(() => roles.find((item) => item.id === roleId) ?? roles[0], [roleId])

  function chooseRole(nextRole: RoleId) {
    setRoleId(nextRole)
    setTab('dashboard')
    setScreen('app')
  }

  return (
    <main className="site-shell">
      <section className="phone" aria-label="LokalANI mobile app preview">
        <StatusBar />
        {screen === 'intro' && <IntroScreen onStart={() => setScreen('roles')} />}
        {screen === 'roles' && <RolePicker onSelect={chooseRole} onBack={() => setScreen('intro')} />}
        {screen === 'app' && (
          <AppScreen
            activeRole={role}
            tab={tab}
            onTabChange={setTab}
            onRoleSwitch={() => setScreen('roles')}
          />
        )}
      </section>
    </main>
  )
}

function StatusBar() {
  return (
    <div className="status-bar" aria-hidden="true">
      <span>9:41</span>
      <span className="notch" />
      <span className="status-icons">▰ ᴸᵀᴱ ●</span>
    </div>
  )
}

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'wordmark compact' : 'wordmark'}>
      <span className="brand-mark">
        <Leaf size={compact ? 17 : 22} strokeWidth={3} />
      </span>
      <span>LokalANI</span>
    </div>
  )
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="screen intro-screen">
      <div className="top-wave" />
      <Wordmark />
      <section className="hero-copy">
        <h1>Tatlong Katuywang, Isang Komunidad</h1>
        <p>Ikonekta ang palengke surplus, karinderya buyers, at TODA delivery sa iisang simpleng daloy.</p>
      </section>

      <section className="community-map" aria-label="LokalANI user flow diagram">
        <div className="dashed-ring" />
        <div className="center-leaf"><Leaf size={46} /></div>
        <DiagramPerson className="node node-top" role="cook" label="Karinderya" />
        <DiagramPerson className="node node-left" role="vendor" label="Taga-Palengke" />
        <DiagramPerson className="node node-right" role="driver" label="Tsuper ng TODA" />
      </section>

      <div className="feature-grid">
        <MiniFeature icon={<Sprout size={22} />} title="Sariwang Ani" />
        <MiniFeature icon={<CircleDollarSign size={22} />} title="Tamang Presyo" />
        <MiniFeature icon={<Truck size={22} />} title="Mabilis na Hatid" />
      </div>

      <button className="primary-btn" type="button" onClick={onStart}>Magsimula</button>
      <p className="signin-copy">May account? <strong>Mag-sign in</strong></p>
    </div>
  )
}

function RolePicker({ onSelect, onBack }: { onSelect: (role: RoleId) => void; onBack: () => void }) {
  return (
    <div className="screen role-screen">
      <button className="ghost-link" type="button" onClick={onBack}>← Balik</button>
      <Wordmark />
      <header className="role-header">
        <h1>Sino ka?</h1>
        <p>Piliin ang iyong papel.</p>
      </header>
      <div className="role-list">
        {roles.map((role) => (
          <button className={`role-card ${role.id}`} key={role.id} type="button" onClick={() => onSelect(role.id)}>
            <Illustration kind={role.illustration} />
            <span className="role-copy">
              <strong>{role.title}</strong>
              <small>{role.description}</small>
            </span>
            <span className="circle-arrow"><ArrowRight size={20} /></span>
          </button>
        ))}
      </div>
    </div>
  )
}

function AppScreen({
  activeRole,
  tab,
  onTabChange,
  onRoleSwitch,
}: {
  activeRole: Role
  tab: TabId
  onTabChange: (tab: TabId) => void
  onRoleSwitch: () => void
}) {
  return (
    <div className="screen app-screen">
      <header className="app-header">
        <div>
          <Wordmark compact />
          <p className="eyebrow">{activeRole.title}</p>
        </div>
        <button className="icon-button" type="button" aria-label="Notifications">
          <Bell size={18} />
        </button>
      </header>
      <main className="app-content">
        {tab === 'dashboard' && <Dashboard role={activeRole} onRoleSwitch={onRoleSwitch} />}
        {tab === 'market' && <MarketTab role={activeRole} />}
        {tab === 'orders' && <OrdersTab role={activeRole} />}
        {tab === 'impact' && <ImpactTab role={activeRole} />}
        {tab === 'profile' && <ProfileTab role={activeRole} onRoleSwitch={onRoleSwitch} />}
      </main>
      <BottomNav tab={tab} onTabChange={onTabChange} />
    </div>
  )
}

function Dashboard({ role, onRoleSwitch }: { role: Role; onRoleSwitch: () => void }) {
  const isBuyer = role.id === 'buyer'
  const isVendor = role.id === 'vendor'
  const greeting = isBuyer ? 'Juan' : isVendor ? 'Aling Tess' : 'Kuya Ben'
  const cta = isBuyer ? 'Maghanap ng Ani' : isVendor ? 'Maglista ng Ani' : 'Tanggapin ang Hatid'

  return (
    <div className="stack">
      <section className="greeting-card">
        <div className="avatar"><Illustration kind={role.illustration} compact /></div>
        <div>
          <p className="muted">Magandang umaga,</p>
          <h2>{greeting}</h2>
        </div>
        <button className="role-switch" type="button" onClick={onRoleSwitch}>Palit</button>
      </section>

      <section className="metric-grid">
        <MetricCard icon={<CircleDollarSign size={20} />} label={isVendor ? 'Kita Ngayon' : isBuyer ? 'Budget Ngayon' : 'Kita Ngayon'} value={isBuyer ? '₱3,850' : isVendor ? '₱920' : '₱480'} />
        <MetricCard icon={<Leaf size={20} />} label={isVendor ? 'Naligtas na Ani' : isBuyer ? 'Nabawasang Basura' : 'Naideliver'} value={isBuyer ? '28 kg' : isVendor ? '46 kg' : '6 jobs'} />
      </section>

      <SectionTitle title={isBuyer ? 'Aktibong Listings' : isVendor ? 'Surplus Ngayon' : 'Malapit na Hatid'} action="Tingnan lahat" />
      <div className="listing-stack">
        {produce.map((item) => <ProduceCard key={item.name} item={item} mode={role.id} />)}
      </div>

      <button className="primary-btn sticky-cta" type="button">
        {role.id === 'driver' ? <Truck size={18} /> : <Plus size={18} />}
        {cta}
      </button>
    </div>
  )
}

function MarketTab({ role }: { role: Role }) {
  const headline = role.id === 'buyer' ? 'Ani malapit sa iyo' : role.id === 'vendor' ? 'Ihanda ang listing' : 'Pickup jobs sa loob ng 2 km'
  return (
    <div className="stack">
      <Panel icon={<MapPin size={20} />} title={headline} text="Hardcoded demo data muna ito para mabilis i-deploy sa Vercel. Walang backend o API requirement." />
      <div className="listing-stack">
        {produce.map((item) => <ProduceCard key={item.name} item={item} mode={role.id} expanded />)}
      </div>
    </div>
  )
}

function OrdersTab({ role }: { role: Role }) {
  const steps = role.id === 'driver'
    ? ['Tanggapin ang pickup', 'Kunin sa palengke', 'Ihatid sa karinderya']
    : ['Reserved ang ani', 'TODA assigned', 'Papunta na ang delivery']

  return (
    <div className="stack">
      <Panel icon={<PackageCheck size={20} />} title="Order #LA-1024" text="Kamatis + Talong mula sa QC Public Market. Estimated arrival: 24 minutes." />
      <section className="timeline-card">
        {steps.map((step, index) => (
          <div className="timeline-row" key={step}>
            <span className="timeline-dot">{index + 1}</span>
            <p>{step}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

function ImpactTab({ role }: { role: Role }) {
  const copy = role.id === 'buyer'
    ? 'Natipid sa sangkap at nabawasang market-floor waste.'
    : role.id === 'vendor'
      ? 'Nabawi ang kita mula sa end-of-day surplus.'
      : 'Dagdag kita mula sa short neighborhood delivery routes.'

  return (
    <div className="stack">
      <Panel icon={<ShieldCheck size={20} />} title="Eco-Badge Progress" text={copy} />
      <section className="impact-grid">
        <MetricCard icon={<Leaf size={20} />} label="Ani Naligtas" value="124 kg" />
        <MetricCard icon={<CircleDollarSign size={20} />} label="Halagang Nabawi" value="₱8,420" />
        <MetricCard icon={<Clock3 size={20} />} label="Oras Natipid" value="14h" />
        <MetricCard icon={<CheckCircle2 size={20} />} label="Completed" value="32" />
      </section>
    </div>
  )
}

function ProfileTab({ role, onRoleSwitch }: { role: Role; onRoleSwitch: () => void }) {
  return (
    <div className="stack">
      <section className="profile-card">
        <Illustration kind={role.illustration} />
        <h2>{role.title}</h2>
        <p>{role.description}</p>
      </section>
      <button className="outline-btn" type="button" onClick={onRoleSwitch}>Lumipat ng role</button>
    </div>
  )
}

function BottomNav({ tab, onTabChange }: { tab: TabId; onTabChange: (tab: TabId) => void }) {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {nav.map((item) => {
        const Icon = item.icon
        return (
          <button className={tab === item.id ? 'active' : ''} type="button" key={item.id} onClick={() => onTabChange(item.id)}>
            <Icon size={18} />
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <article className="metric-card">
      <span>{icon}</span>
      <small>{label}</small>
      <strong>{value}</strong>
    </article>
  )
}

function ProduceCard({ item, mode, expanded = false }: { item: ProduceItem; mode: RoleId; expanded?: boolean }) {
  const action = mode === 'buyer' ? 'Reserve' : mode === 'vendor' ? 'Edit' : 'Pickup'
  return (
    <article className={expanded ? 'produce-card expanded' : 'produce-card'}>
      <img src={item.image} alt={item.name} />
      <div className="produce-info">
        <strong>{item.name}</strong>
        <span>{item.vendor} · {item.distance}</span>
        {expanded && <small>{item.qty} · {item.freshness}</small>}
        <p><b>{item.price}</b> <del>{item.oldPrice}</del></p>
      </div>
      <button type="button" aria-label={`${action} ${item.name}`}>{expanded ? action : <ArrowRight size={16} />}</button>
    </article>
  )
}

function SectionTitle({ title, action }: { title: string; action: string }) {
  return (
    <div className="section-title">
      <h3>{title}</h3>
      <button type="button">{action}</button>
    </div>
  )
}

function Panel({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <section className="panel-card">
      <span>{icon}</span>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </section>
  )
}

function MiniFeature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <article className="mini-feature">
      <span>{icon}</span>
      <strong>{title}</strong>
    </article>
  )
}

function DiagramPerson({ className, role, label }: { className: string; role: Role['illustration']; label: string }) {
  return (
    <div className={className}>
      <Illustration kind={role} compact />
      <span>{label}</span>
    </div>
  )
}

function Illustration({ kind, compact = false }: { kind: Role['illustration']; compact?: boolean }) {
  if (kind === 'driver') {
    return (
      <div className={compact ? 'illustration compact driver-ill' : 'illustration driver-ill'} aria-hidden="true">
        <div className="tricycle-body" />
        <div className="tricycle-cabin" />
        <div className="wheel one" />
        <div className="wheel two" />
        <div className="person-head" />
        <div className="person-body" />
      </div>
    )
  }

  return (
    <div className={compact ? `illustration compact ${kind}-ill` : `illustration ${kind}-ill`} aria-hidden="true">
      <div className="halo" />
      <div className="person-head" />
      <div className="hair" />
      <div className="person-body" />
      <div className="basket" />
      <span className="veg v1" />
      <span className="veg v2" />
      <span className="veg v3" />
    </div>
  )
}

export default App
