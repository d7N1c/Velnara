import React,{useCallback,useEffect,useMemo,useState} from 'react';
import{createRoot}from'react-dom/client';
import{createClient}from'@supabase/supabase-js';
import{Car,Sparkles,MapPin,ShieldCheck,ChevronRight,CheckCircle2,LayoutDashboard,X,LogOut,RefreshCw,Phone,MessageCircle,Navigation,Send,Download}from'lucide-react';
import'./style.css';

const supabase=createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

const copy={
de:{navServices:'Leistungen',navBook:'Buchen',navWhy:'Warum VELNARA',book:'Termin buchen',kicker:'MOBILE DETAILING · GANZ BERLIN',hero:'Premium Fahrzeugpflege. Direkt bei dir.',lead:'Professionelle Innen- und Außenpflege an deinem Standort in Berlin. Klarer Preis, einfache Buchung, kein Werkstattweg.',start:'Preis berechnen',services:'Unsere Leistungen',servicesSub:'Vom schnellen Refresh bis zum kompletten Detailing.',vehicle:'Fahrzeug wählen',package:'Paket wählen',extras:'Extras',details:'Termin & Kontakt',continue:'Weiter',back:'Zurück',summary:'Deine Buchung',total:'Richtpreis',name:'Name',phone:'Telefon',email:'E-Mail',address:'Adresse in Berlin',date:'Datum',time:'Uhrzeit',notes:'Hinweise (optional)',send:'Buchungsanfrage senden',sending:'Wird gesendet…',success:'Anfrage erhalten!',success2:'Deine Anfrage wurde sicher gespeichert. Wir bestätigen den Termin anschließend persönlich.',error:'Die Anfrage konnte nicht gesendet werden. Bitte versuche es erneut.',new:'Neue Buchung',why:'Warum VELNARA',why1:'Wir kommen zu dir',why2:'Transparente Preise',why3:'Sorgfältige Arbeit',admin:'Admin',orders:'Buchungen',disclaimer:'Der Endpreis kann bei außergewöhnlich starker Verschmutzung, Tierhaaren oder Sonderfahrzeugen abweichen.',slotTaken:'Dieser Termin ist leider schon vergeben. Bitte wähle eine andere Uhrzeit.',chooseTime:'Uhrzeit wählen',booked:'belegt'},
en:{navServices:'Services',navBook:'Book',navWhy:'Why VELNARA',book:'Book appointment',kicker:'MOBILE DETAILING · ALL BERLIN',hero:'Premium vehicle care. At your location.',lead:'Professional interior and exterior care at your location in Berlin. Clear pricing, easy booking, no workshop trip.',start:'Calculate price',services:'Our services',servicesSub:'From a quick refresh to complete detailing.',vehicle:'Choose vehicle',package:'Choose package',extras:'Extras',details:'Appointment & contact',continue:'Continue',back:'Back',summary:'Your booking',total:'Guide price',name:'Name',phone:'Phone',email:'Email',address:'Berlin address',date:'Date',time:'Time',notes:'Notes (optional)',send:'Send booking request',sending:'Sending…',success:'Request received!',success2:'Your request was securely saved. We will personally confirm the appointment afterwards.',error:'The request could not be sent. Please try again.',new:'New booking',why:'Why VELNARA',why1:'We come to you',why2:'Transparent prices',why3:'Careful workmanship',admin:'Admin',orders:'Bookings',disclaimer:'Final price may vary for unusually heavy soiling, pet hair or special vehicles.',slotTaken:'That time has just been booked. Please choose another slot.',chooseTime:'Choose time',booked:'booked'},
ru:{navServices:'Услуги',navBook:'Запись',navWhy:'Почему VELNARA',book:'Записаться',kicker:'МОБИЛЬНЫЙ ДЕТЕЙЛИНГ · ВЕСЬ БЕРЛИН',hero:'Премиальный уход за авто. Прямо у вас.',lead:'Профессиональная уборка и детейлинг автомобиля по вашему адресу в Берлине. Понятная цена и простая запись.',start:'Рассчитать цену',services:'Наши услуги',servicesSub:'От быстрой уборки до полного детейлинга.',vehicle:'Выберите автомобиль',package:'Выберите пакет',extras:'Дополнительно',details:'Время и контакты',continue:'Дальше',back:'Назад',summary:'Ваш заказ',total:'Ориентировочная цена',name:'Имя',phone:'Телефон',email:'E-mail',address:'Адрес в Берлине',date:'Дата',time:'Время',notes:'Комментарий (необязательно)',send:'Отправить заявку',sending:'Отправляем…',success:'Заявка получена!',success2:'Заявка безопасно сохранена в базе. После этого мы лично подтвердим время.',error:'Не удалось отправить заявку. Попробуйте ещё раз.',new:'Новая запись',why:'Почему VELNARA',why1:'Мы приезжаем к вам',why2:'Понятные цены',why3:'Аккуратная работа',admin:'Admin',orders:'Заказы',disclaimer:'Итоговая цена может измениться при очень сильном загрязнении, шерсти животных или нестандартном автомобиле.',slotTaken:'Это время уже занято. Выберите другой слот.',chooseTime:'Выберите время',booked:'занято'}
};

const vehicles=[{n:'Kleinwagen',ex:'Polo · Corsa · Fiat 500',add:0,code:'small'},{n:'Limousine / Kombi',ex:'Golf · Passat · 3er',add:10,code:'sedan_wagon'},{n:'SUV',ex:'Tiguan · X3 · GLC',add:20,code:'suv'},{n:'Van / Transporter',ex:'Caddy · Vito · Transporter',add:35,code:'van'}];
const packs=[{n:'Interior Refresh',p:49,code:'refresh',d:['Vacuum','Waste removal','Dust & surfaces','Interior glass']},{n:'Deep Interior',p:89,code:'deep',d:['Interior Refresh','Stain treatment','Upholstery / leather','Mats & details']},{n:'Inside + Outside',p:129,code:'full',d:['Deep Interior','Exterior hand wash','Wheels','Glass','Tyre finish']},{n:'VELNARA Complete',p:179,code:'complete',d:['Inside + Outside','Gentle engine bay','Plastic care','Tyre protection','Final inspection']}];
const extras=[{n:'Pet hair',p:25,code:'pet_hair'},{n:'Odour neutralisation',p:25,code:'odour'},{n:'Leather care',p:30,code:'leather'},{n:'Tyre Protection+',p:15,code:'tyre_protection'}];

const statuses=[
  ['new','New'],
  ['confirmed','Confirmed'],
  ['on_the_way','On the way'],
  ['in_progress','In progress'],
  ['completed','Completed'],
  ['cancelled','Cancelled']
];

const money=n=>new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n);
const vehicleName=code=>vehicles.find(x=>x.code===code)?.n||code;
const packageName=code=>packs.find(x=>x.code===code)?.n||code;
const extraName=code=>extras.find(x=>x.code===code)?.n||code;

function Logo(){return <div className="brand"><div className="vmark">V</div><div><b>VELNARA</b><small>BERLIN DETAILING</small></div></div>}

function App(){
  const[lang,setLang]=useState('de'),[step,setStep]=useState(1),[v,setV]=useState(null),[p,setP]=useState(null),[xs,setXs]=useState([]),[done,setDone]=useState(null),[admin,setAdmin]=useState(false),[saving,setSaving]=useState(false),[saveError,setSaveError]=useState('');
  const[session,setSession]=useState(null),[orders,setOrders]=useState([]),[adminLoading,setAdminLoading]=useState(false),[adminError,setAdminError]=useState(''),[orderFilter,setOrderFilter]=useState('all'),[installPrompt,setInstallPrompt]=useState(null),[selectedDate,setSelectedDate]=useState(''),[busySlots,setBusySlots]=useState([]),[slotLoading,setSlotLoading]=useState(false);
  const t=copy[lang];

  const total=useMemo(()=>p===null?0:packs[p].p+(v===null?0:vehicles[v].add)+xs.reduce((a,i)=>a+extras[i].p,0),[v,p,xs]);
  const timeSlots=['09:00','11:30','14:00','16:30'];
  const filteredOrders=useMemo(()=>orderFilter==='all'?orders:orders.filter(o=>o.status===orderFilter),[orders,orderFilter]);

  useEffect(()=>{document.documentElement.lang=lang},[lang]);
  useEffect(()=>{
    if('serviceWorker'in navigator)navigator.serviceWorker.register('/sw.js').catch(()=>{});
    const handler=e=>{e.preventDefault();setInstallPrompt(e)};
    window.addEventListener('beforeinstallprompt',handler);
    return()=>window.removeEventListener('beforeinstallprompt',handler);
  },[]);


  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>setSession(data.session||null));
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_event,next)=>setSession(next));
    return()=>subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    let cancelled=false;
    if(!selectedDate){setBusySlots([]);return}
    setSlotLoading(true);
    supabase.from('booking_availability')
      .select('booking_time')
      .eq('booking_date',selectedDate)
      .then(({data,error})=>{
        if(cancelled)return;
        setSlotLoading(false);
        if(error){console.error('Availability load failed',error.message);setBusySlots([]);return}
        setBusySlots((data||[]).map(x=>String(x.booking_time).slice(0,5)));
      });
    return()=>{cancelled=true};
  },[selectedDate]);

  const loadOrders=useCallback(async()=>{
    setAdminLoading(true);setAdminError('');
    const{data,error}=await supabase.from('bookings')
      .select('id,booking_code,created_at,customer_name,email,phone,telegram_username,address,booking_date,booking_time,vehicle_class,package_code,extras,quoted_price_eur,status,notes')
      .order('created_at',{ascending:false});
    setAdminLoading(false);
    if(error){console.error('Admin load failed',error.message);setAdminError('Could not load bookings. Check that this account has the admin role.');return}
    setOrders(data||[]);
  },[]);

  useEffect(()=>{
    if(admin&&session)loadOrders();
  },[admin,session,loadOrders]);

  const installApp=async()=>{
    if(!installPrompt)return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  const save=async e=>{
    e.preventDefault();
    if(v===null||p===null||saving)return;
    setSaving(true);setSaveError('');
    const f=new FormData(e.currentTarget);
    const payload={
      customer_name:String(f.get('name')||'').trim(),
      phone:String(f.get('phone')||'').trim(),
      email:String(f.get('email')||'').trim()||null,
      telegram_username:String(f.get('telegram')||'').trim().replace(/^@/,'')||null,
      address:String(f.get('address')||'').trim(),
      booking_date:f.get('date'),
      booking_time:f.get('time'),
      vehicle_class:vehicles[v].code,
      package_code:packs[p].code,
      extras:xs.map(i=>extras[i].code),
      quoted_price_eur:total,
      status:'new',
      notes:String(f.get('notes')||'').trim()||null
    };
    const{error}=await supabase.from('bookings').insert(payload);
    setSaving(false);
    if(error){console.error('Booking failed',error.message);setSaveError(error.code==='23505'?t.slotTaken:t.error);if(error.code==='23505'&&payload.booking_date===selectedDate)setBusySlots(cur=>cur.includes(String(payload.booking_time).slice(0,5))?cur:[...cur,String(payload.booking_time).slice(0,5)]);return}
    setDone({id:'VELNARA'});setSelectedDate('');setBusySlots([]);
  };

  const signIn=async e=>{
    e.preventDefault();setAdminLoading(true);setAdminError('');
    const f=new FormData(e.currentTarget);
    const{data,error}=await supabase.auth.signInWithPassword({
      email:String(f.get('admin_email')||'').trim(),
      password:String(f.get('admin_password')||'')
    });
    setAdminLoading(false);
    if(error){setAdminError(error.message);return}
    if(data.user?.app_metadata?.role!=='admin'){
      await supabase.auth.signOut();
      setAdminError('This account does not have VELNARA admin access.');
      return;
    }
    setSession(data.session);
  };

  const signOut=async()=>{await supabase.auth.signOut();setOrders([]);setAdminError('')};

  const updateStatus=async(id,status)=>{
    const previous=orders;
    setOrders(cur=>cur.map(x=>x.id===id?{...x,status}:x));
    const{error}=await supabase.from('bookings').update({status}).eq('id',id);
    if(error){setOrders(previous);setAdminError('Could not update status: '+error.message)}
  };

  return <><header><Logo/><nav><a href="#services">{t.navServices}</a><a href="#why">{t.navWhy}</a><a href="#booking">{t.navBook}</a></nav><div className="right"><div className="langs">{['de','en','ru'].map(x=><button key={x} className={lang===x?'active':''} onClick={()=>setLang(x)}>{x.toUpperCase()}</button>)}</div><a className="btn gold" href="#booking">{t.book}</a></div></header>

  <section className="hero"><div className="heroText"><span className="kicker">{t.kicker}</span><h1>{t.hero}</h1><p>{t.lead}</p><div className="heroBtns"><a className="btn gold big" href="#booking">{t.start}<ChevronRight size={18}/></a><a className="btn outline big" href="#services">{t.services}</a></div><div className="trust"><span><CheckCircle2/> Berlinweit</span><span><CheckCircle2/> Mobile Service</span><span><CheckCircle2/> Launch Prices</span></div></div><div className="visual"><div className="bigV">V</div><div className="shine"></div><div className="visualBottom"><b>VELNARA</b><span>BERLIN DETAILING</span></div></div></section>

  <section id="services" className="section"><span className="kicker">01 · DETAILING</span><h2>{t.services}</h2><p className="subline">{t.servicesSub}</p><div className="serviceGrid">{packs.map((x,i)=><article key={x.code} className={i===1?'featured':''}><span className="num">0{i+1}</span><h3>{x.n}</h3><div className="price">ab {money(x.p)}</div><ul>{x.d.map(y=><li key={y}><CheckCircle2/>{y}</li>)}</ul><a href="#booking" onClick={()=>{setP(i);setStep(v===null?1:3)}}>{t.book}<ChevronRight/></a></article>)}</div></section>

  <section id="why" className="section why"><span className="kicker">02 · VELNARA</span><h2>{t.why}</h2><div className="whygrid"><div><MapPin/><h3>{t.why1}</h3><p>Mobile service across Berlin.</p></div><div><ShieldCheck/><h3>{t.why2}</h3><p>Package + vehicle class + extras.</p></div><div><Sparkles/><h3>{t.why3}</h3><p>Clear checklist for every service.</p></div></div></section>

  <section id="booking" className="section booking"><div className="bookHead"><span className="kicker">03 · ONLINE BOOKING</span><h2>{t.book}</h2></div>{done?<div className="success"><CheckCircle2 size={52}/><h2>{t.success}</h2><p>{t.success2}</p><b>{done.id}</b><button className="btn gold" onClick={()=>{setDone(null);setStep(1);setV(null);setP(null);setXs([]);setSelectedDate('');setBusySlots([])}}>{t.new}</button></div>:<div className="bookGrid"><div className="wizard"><div className="progress">{[1,2,3,4].map(i=><i key={i} className={step>=i?'on':''}/>)}</div>{step===1&&<><h3>{t.vehicle}</h3><div className="choices">{vehicles.map((x,i)=><button key={x.code} className={v===i?'selected':''} onClick={()=>{setV(i);setStep(2)}}><Car/><span><b>{x.n}</b><small>{x.ex}{x.add?` · +${money(x.add)}`:''}</small></span></button>)}</div></>}{step===2&&<><h3>{t.package}</h3><div className="choices">{packs.map((x,i)=><button key={x.code} className={p===i?'selected':''} onClick={()=>{setP(i);setStep(3)}}><Sparkles/><span><b>{x.n}</b><small>ab {money(x.p)}</small></span></button>)}</div><button className="textbtn" onClick={()=>setStep(1)}>← {t.back}</button></>}{step===3&&<><h3>{t.extras}</h3><div className="choices">{extras.map((x,i)=><button key={x.code} className={xs.includes(i)?'selected':''} onClick={()=>setXs(xs.includes(i)?xs.filter(z=>z!==i):[...xs,i])}><span><b>{x.n}</b><small>+{money(x.p)}</small></span></button>)}</div><div className="actions"><button className="textbtn" onClick={()=>setStep(2)}>← {t.back}</button><button className="btn gold" onClick={()=>setStep(4)}>{t.continue}</button></div></>}{step===4&&<form onSubmit={save}><h3>{t.details}</h3><div className="formgrid"><label>{t.name}<input required name="name"/></label><label>{t.phone}<input required name="phone" type="tel"/></label><label>{t.email}<input name="email" type="email"/></label><label>Telegram (optional)<input name="telegram" placeholder="@username"/></label><label>{t.address}<input required name="address"/></label><label>{t.date}<input required name="date" type="date" value={selectedDate} onChange={e=>setSelectedDate(e.target.value)} min={new Date(Date.now()+86400000).toISOString().slice(0,10)}/></label><label>{t.time}<select required name="time" defaultValue=""><option value="" disabled>{slotLoading?'…':t.chooseTime}</option>{timeSlots.map(slot=><option key={slot} value={slot} disabled={busySlots.includes(slot)}>{slot}{busySlots.includes(slot)?` · ${t.booked}`:''}</option>)}</select></label><label className="wide">{t.notes}<textarea name="notes" rows="3"/></label></div>{saveError&&<p className="formerror">{saveError}</p>}<div className="actions"><button type="button" className="textbtn" onClick={()=>setStep(3)}>← {t.back}</button><button disabled={saving} className="btn gold">{saving?t.sending:t.send}</button></div></form>}</div><aside><h3>{t.summary}</h3>{v!==null&&<Row a={t.vehicle} b={vehicles[v].n}/>} {p!==null&&<Row a={t.package} b={packs[p].n}/>} {xs.map(i=><Row key={extras[i].code} a={extras[i].n} b={'+'+money(extras[i].p)}/>)}<div className="grand"><span>{t.total}</span><b>{money(total)}</b></div><p className="fine">{t.disclaimer}</p></aside></div>}</section>

  <footer><Logo/><span>© 2026 VELNARA · Mobile Detailing Berlin</span><div className="footerActions">{installPrompt&&<button onClick={installApp}><Download/> Install app</button>}<button onClick={()=>setAdmin(true)}><LayoutDashboard/> {t.admin}</button></div></footer>

  {admin&&<div className="modal"><div className="admin"><button className="close" onClick={()=>setAdmin(false)}><X/></button><div className="adminHead"><Logo/><div><h2>{t.orders}</h2><p>VELNARA operations dashboard</p></div></div>
    {!session?<form className="adminLogin" onSubmit={signIn}><h3>Admin login</h3><label>Email<input required type="email" name="admin_email" autoComplete="username"/></label><label>Password<input required type="password" name="admin_password" autoComplete="current-password"/></label>{adminError&&<p className="formerror">{adminError}</p>}<button disabled={adminLoading} className="btn gold">{adminLoading?'Signing in…':'Sign in'}</button></form>:
    <><div className="adminToolbar"><div><b>{session.user.email}</b><small>Secure admin session</small></div><div className="adminActions"><button className="btn outline" disabled={adminLoading} onClick={loadOrders}><RefreshCw size={16}/>{adminLoading?'Loading…':'Refresh'}</button><button className="btn outline" onClick={signOut}><LogOut size={16}/>Sign out</button></div></div>{adminError&&<p className="formerror">{adminError}</p>}
    <div className="adminStats"><div><span>Total</span><b>{orders.length}</b></div><div><span>New</span><b>{orders.filter(x=>x.status==='new').length}</b></div><div><span>Confirmed</span><b>{orders.filter(x=>x.status==='confirmed').length}</b></div><div><span>Completed</span><b>{orders.filter(x=>x.status==='completed').length}</b></div></div>
    <div className="orderFilters">{[['all','All'],...statuses].map(([value,label])=><button key={value} className={orderFilter===value?'active':''} onClick={()=>setOrderFilter(value)}>{label}</button>)}</div>
    <div className="tablewrap desktopOrders"><table><thead><tr><th>Booking</th><th>Customer</th><th>Appointment</th><th>Service</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filteredOrders.length===0&&!adminLoading?<tr><td colSpan="7" className="empty">No bookings in this filter.</td></tr>:filteredOrders.map(o=><tr key={o.id}><td><b>{o.booking_code}</b><small>{new Date(o.created_at).toLocaleString()}</small></td><td><b>{o.customer_name}</b><small>{o.phone}</small>{o.email&&<small>{o.email}</small>}{o.telegram_username&&<small>@{o.telegram_username}</small>}<small>{o.address}</small>{o.notes&&<small>Note: {o.notes}</small>}</td><td><b>{o.booking_date}</b><small>{String(o.booking_time).slice(0,5)}</small></td><td><b>{vehicleName(o.vehicle_class)}</b><small>{packageName(o.package_code)}</small>{o.extras?.length>0&&<small>{o.extras.map(extraName).join(', ')}</small>}</td><td><b>{money(o.quoted_price_eur)}</b></td><td><select value={o.status} onChange={e=>updateStatus(o.id,e.target.value)}>{statuses.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></td><td><OrderActions order={o}/></td></tr>)}</tbody></table></div>
    <div className="mobileOrders">{filteredOrders.length===0&&!adminLoading?<div className="emptyCard">No bookings in this filter.</div>:filteredOrders.map(o=><article className="orderCard" key={o.id}><div className="orderCardTop"><div><b>{o.booking_code}</b><small>{new Date(o.created_at).toLocaleString()}</small></div><strong>{money(o.quoted_price_eur)}</strong></div><div className="orderCardGrid"><div><span>Customer</span><b>{o.customer_name}</b><small>{o.phone}</small>{o.email&&<small>{o.email}</small>}{o.telegram_username&&<small>@{o.telegram_username}</small>}</div><div><span>Appointment</span><b>{o.booking_date}</b><small>{String(o.booking_time).slice(0,5)}</small></div><div><span>Service</span><b>{packageName(o.package_code)}</b><small>{vehicleName(o.vehicle_class)}</small></div><div><span>Address</span><b>{o.address}</b>{o.notes&&<small>Note: {o.notes}</small>}</div></div><select className="statusSelect" value={o.status} onChange={e=>updateStatus(o.id,e.target.value)}>{statuses.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select><OrderActions order={o}/></article>)}</div></>}
  </div></div>}</>
}

function OrderActions({order}){
  const phone=String(order.phone||'').trim();
  const wa=phone.replace(/\D/g,'');
  const route='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(order.address||'Berlin');
  const tg=String(order.telegram_username||'').replace(/^@/,'');
  return <div className="orderActions">
    <a className="quickAction" href={'tel:'+phone}><Phone size={15}/>Call</a>
    {wa&&<a className="quickAction" href={'https://wa.me/'+wa} target="_blank" rel="noreferrer"><MessageCircle size={15}/>WhatsApp</a>}
    {tg&&<a className="quickAction" href={'https://t.me/'+encodeURIComponent(tg)} target="_blank" rel="noreferrer"><Send size={15}/>Telegram</a>}
    <a className="quickAction" href={route} target="_blank" rel="noreferrer"><Navigation size={15}/>Route</a>
  </div>
}
function Row({a,b}){return <div className="row"><span>{a}</span><b>{b}</b></div>}
createRoot(document.getElementById('root')).render(<App/>);
