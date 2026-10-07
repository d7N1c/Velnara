import React,{useCallback,useEffect,useMemo,useState} from 'react';
import{createRoot}from'react-dom/client';
import{createClient}from'@supabase/supabase-js';
import{Car,Sparkles,MapPin,ShieldCheck,ChevronRight,CheckCircle2,LayoutDashboard,X,LogOut,RefreshCw,Phone,MessageCircle,Navigation,Send,Download,CalendarDays,List}from'lucide-react';
import'./style.css';

const supabase=createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

const copy={
de:{
  navServices:'Leistungen',navBook:'Buchen',navWhy:'Warum VELNARA',book:'Termin buchen',
  kicker:'MOBILE DETAILING · GANZ BERLIN',hero:'Premium Fahrzeugpflege. Direkt bei dir.',
  lead:'Professionelle Innen- und Außenpflege an deinem Standort in Berlin. Klarer Preis, einfache Buchung, kein Werkstattweg.',
  start:'Preis berechnen',services:'Unsere Leistungen',servicesSub:'Vom schnellen Refresh bis zum kompletten Detailing.',
  vehicle:'Fahrzeug wählen',package:'Paket wählen',extras:'Extras',details:'Termin & Kontakt',
  continue:'Weiter',back:'Zurück',summary:'Deine Buchung',total:'Richtpreis',name:'Name',phone:'Telefon',
  email:'E-Mail',address:'Adresse in Berlin',date:'Datum',time:'Uhrzeit',notes:'Hinweise (optional)',
  send:'Buchungsanfrage senden',sending:'Wird gesendet…',success:'Anfrage erhalten!',
  success2:'Deine Anfrage wurde sicher gespeichert. Wir bestätigen den Termin anschließend persönlich.',
  error:'Die Anfrage konnte nicht gesendet werden. Bitte versuche es erneut.',new:'Neue Buchung',
  why:'Warum VELNARA',why1:'Wir kommen zu dir',why2:'Transparente Preise',why3:'Sorgfältige Arbeit',
  whyDesc1:'Mobiler Service in ganz Berlin – wir kommen direkt zu deinem Standort.',
  whyDesc2:'Klare Paketpreise plus Fahrzeugklasse und frei wählbare Extras.',
  whyDesc3:'Klare Checkliste und sorgfältige Ausführung bei jedem Auftrag.',
  admin:'Admin',orders:'Buchungen',
  disclaimer:'Der Endpreis kann bei außergewöhnlich starker Verschmutzung, Tierhaaren oder Sonderfahrzeugen abweichen.',
  slotTaken:'Dieser Termin ist leider schon vergeben. Bitte wähle eine andere Uhrzeit.',
  chooseTime:'Uhrzeit wählen',booked:'belegt',
  trust1:'Berlinweit',trust2:'Mobiler Service',trust3:'Einführungspreise',
  onlineBooking:'ONLINE-BUCHUNG',bookingReference:'Buchungsnummer',
  vehicleLabel:'Fahrzeug',packageLabel:'Paket',priceLabel:'Preis',addressLabel:'Adresse',
  telegramOptional:'Telegram (optional)',installApp:'App installieren',from:'ab',
  navAdvantages:'Vorteile',navProcess:'So funktioniert’s',
  advantagesKicker:'DEINE VORTEILE',advantagesTitle:'Mehr Komfort. Weniger Aufwand.',
  advantagesSub:'VELNARA verbindet mobile Fahrzeugpflege mit klaren Preisen, flexibler Buchung und persönlichem Service.',
  adv1:'Wir kommen zu dir',adv1d:'Kein Weg zur Waschstraße oder Werkstatt – wir arbeiten an deinem Standort in Berlin.',
  adv2:'Klare Preise',adv2d:'Du siehst Paket, Fahrzeugaufschlag und Extras vor dem Absenden deiner Anfrage.',
  adv3:'Professionelle Pflege',adv3d:'Sorgfältige Innen- und Außenpflege mit einem klaren Ablauf für jedes Fahrzeug.',
  adv4:'Flexible Termine',adv4d:'Wähle online einen freien Termin, der zu deinem Tagesablauf passt.',
  adv5:'Persönliche Bestätigung',adv5d:'Nach deiner Anfrage bestätigen wir den Termin persönlich und transparent.',
  adv6:'Direkter Kontakt',adv6d:'Telefon, WhatsApp und Telegram – kurze Wege, wenn du Fragen zu deinem Auftrag hast.',
  processKicker:'SO EINFACH GEHT’S',processTitle:'In drei Schritten zu deinem Termin',
  processSub:'Keine langen Formulare und keine unnötigen Telefonate.',
  step1:'Fahrzeug & Paket wählen',step1d:'Wähle deine Fahrzeugklasse, das passende Paket und gewünschte Extras.',
  step2:'Termin online buchen',step2d:'Wähle einen freien Tag und eine verfügbare Uhrzeit und sende deine Anfrage.',
  step3:'Wir kommen zu dir',step3d:'Nach der Bestätigung kommt VELNARA zum vereinbarten Standort in Berlin.',
  ctaTitle:'Bereit für ein sauberes Fahrzeug?',ctaText:'Wähle jetzt dein Paket und reserviere einen passenden Termin.',
  ctaButton:'Termin auswählen',telegramInvalid:'Bitte gib einen gültigen Telegram-Benutzernamen ein (5–32 Zeichen: Buchstaben, Zahlen oder _), oder lasse das Feld leer.'
},
en:{
  navServices:'Services',navBook:'Book',navWhy:'Why VELNARA',book:'Book appointment',
  kicker:'MOBILE DETAILING · ALL BERLIN',hero:'Premium vehicle care. At your location.',
  lead:'Professional interior and exterior care at your location in Berlin. Clear pricing, easy booking, no workshop trip.',
  start:'Calculate price',services:'Our services',servicesSub:'From a quick refresh to complete detailing.',
  vehicle:'Choose vehicle',package:'Choose package',extras:'Extras',details:'Appointment & contact',
  continue:'Continue',back:'Back',summary:'Your booking',total:'Guide price',name:'Name',phone:'Phone',
  email:'Email',address:'Berlin address',date:'Date',time:'Time',notes:'Notes (optional)',
  send:'Send booking request',sending:'Sending…',success:'Request received!',
  success2:'Your request was securely saved. We will personally confirm the appointment afterwards.',
  error:'The request could not be sent. Please try again.',new:'New booking',
  why:'Why VELNARA',why1:'We come to you',why2:'Transparent pricing',why3:'Careful workmanship',
  whyDesc1:'Mobile service across Berlin – we come directly to your location.',
  whyDesc2:'Clear package pricing plus vehicle class and optional extras.',
  whyDesc3:'A clear checklist and careful workmanship for every booking.',
  admin:'Admin',orders:'Bookings',
  disclaimer:'Final price may vary for unusually heavy soiling, pet hair or special vehicles.',
  slotTaken:'That time has just been booked. Please choose another slot.',
  chooseTime:'Choose time',booked:'booked',
  trust1:'All Berlin',trust2:'Mobile service',trust3:'Launch prices',
  onlineBooking:'ONLINE BOOKING',bookingReference:'Booking reference',
  vehicleLabel:'Vehicle',packageLabel:'Package',priceLabel:'Price',addressLabel:'Address',
  telegramOptional:'Telegram (optional)',installApp:'Install app',from:'from',
  navAdvantages:'Advantages',navProcess:'How it works',
  advantagesKicker:'YOUR ADVANTAGES',advantagesTitle:'More convenience. Less effort.',
  advantagesSub:'VELNARA combines mobile car care with clear pricing, flexible booking and personal service.',
  adv1:'We come to you',adv1d:'No trip to a car wash or workshop – we work at your location anywhere in Berlin.',
  adv2:'Clear pricing',adv2d:'See your package, vehicle surcharge and extras before sending the booking request.',
  adv3:'Professional care',adv3d:'Careful interior and exterior detailing with a clear process for every vehicle.',
  adv4:'Flexible appointments',adv4d:'Choose an available appointment online that fits your schedule.',
  adv5:'Personal confirmation',adv5d:'After your request, we personally confirm the appointment and keep everything clear.',
  adv6:'Direct contact',adv6d:'Phone, WhatsApp and Telegram – quick contact whenever you have a question about your booking.',
  processKicker:'HOW IT WORKS',processTitle:'Your appointment in three steps',
  processSub:'No long forms and no unnecessary phone calls.',
  step1:'Choose car & package',step1d:'Select your vehicle class, service package and any extras you want.',
  step2:'Book online',step2d:'Choose an available day and time, then send your booking request.',
  step3:'We come to you',step3d:'Once confirmed, VELNARA comes to the agreed location in Berlin.',
  ctaTitle:'Ready for a cleaner car?',ctaText:'Choose your package and reserve a suitable appointment now.',
  ctaButton:'Choose appointment',telegramInvalid:'Please enter a valid Telegram username (5–32 characters: letters, numbers or _), or leave the field empty.'
},
ru:{
  navServices:'Услуги',navBook:'Запись',navWhy:'Почему VELNARA',book:'Записаться',
  kicker:'МОБИЛЬНЫЙ ДЕТЕЙЛИНГ · ВЕСЬ БЕРЛИН',hero:'Премиальный уход за авто. Прямо у вас.',
  lead:'Профессиональная уборка и детейлинг автомобиля по вашему адресу в Берлине. Понятная цена и простая запись.',
  start:'Рассчитать цену',services:'Наши услуги',servicesSub:'От быстрой уборки до полного детейлинга.',
  vehicle:'Выберите автомобиль',package:'Выберите пакет',extras:'Дополнительно',details:'Время и контакты',
  continue:'Дальше',back:'Назад',summary:'Ваш заказ',total:'Ориентировочная цена',name:'Имя',phone:'Телефон',
  email:'E-mail',address:'Адрес в Берлине',date:'Дата',time:'Время',notes:'Комментарий (необязательно)',
  send:'Отправить заявку',sending:'Отправляем…',success:'Заявка получена!',
  success2:'Заявка безопасно сохранена. Мы отдельно подтвердим выбранное время.',
  error:'Не удалось отправить заявку. Попробуйте ещё раз.',new:'Новая запись',
  why:'Почему VELNARA',why1:'Мы приезжаем к вам',why2:'Понятные цены',why3:'Аккуратная работа',
  whyDesc1:'Мобильный сервис по всему Берлину — мы приезжаем прямо к вашему адресу.',
  whyDesc2:'Понятная цена пакета с учётом класса автомобиля и выбранных дополнений.',
  whyDesc3:'Чёткий список работ и аккуратное выполнение каждого заказа.',
  admin:'Admin',orders:'Заказы',
  disclaimer:'Итоговая цена может измениться при очень сильном загрязнении, шерсти животных или нестандартном автомобиле.',
  slotTaken:'Это время уже занято. Выберите другой слот.',
  chooseTime:'Выберите время',booked:'занято',
  trust1:'Весь Берлин',trust2:'Выездной сервис',trust3:'Стартовые цены',
  onlineBooking:'ОНЛАЙН-ЗАПИСЬ',bookingReference:'Номер брони',
  vehicleLabel:'Автомобиль',packageLabel:'Пакет',priceLabel:'Цена',addressLabel:'Адрес',
  telegramOptional:'Telegram (необязательно)',installApp:'Установить приложение',from:'от',
  navAdvantages:'Преимущества',navProcess:'Как это работает',
  advantagesKicker:'ВАШИ ПРЕИМУЩЕСТВА',advantagesTitle:'Больше удобства. Меньше хлопот.',
  advantagesSub:'VELNARA сочетает выездной уход за автомобилем, понятные цены, удобную запись и личный сервис.',
  adv1:'Мы приезжаем к вам',adv1d:'Не нужно ехать на мойку или в мастерскую — мы работаем по вашему адресу в Берлине.',
  adv2:'Понятные цены',adv2d:'До отправки заявки вы видите пакет, доплату за класс автомобиля и выбранные дополнения.',
  adv3:'Профессиональный уход',adv3d:'Аккуратная уборка салона и кузова по понятному стандарту для каждого автомобиля.',
  adv4:'Удобное время',adv4d:'Выберите онлайн свободную дату и время, которые подходят вашему графику.',
  adv5:'Личное подтверждение',adv5d:'После заявки мы лично подтверждаем время и фиксируем детали заказа.',
  adv6:'Прямая связь',adv6d:'Телефон, WhatsApp и Telegram — можно быстро связаться с нами по своему заказу.',
  processKicker:'КАК ЭТО РАБОТАЕТ',processTitle:'Три шага до вашего визита',
  processSub:'Без длинных форм и лишних звонков.',
  step1:'Выберите авто и пакет',step1d:'Укажите класс автомобиля, подходящий пакет и нужные дополнительные услуги.',
  step2:'Запишитесь онлайн',step2d:'Выберите свободную дату и время и отправьте заявку.',
  step3:'Мы приезжаем к вам',step3d:'После подтверждения VELNARA приезжает в согласованное место в Берлине.',
  ctaTitle:'Готовы привести авто в порядок?',ctaText:'Выберите пакет и забронируйте подходящее время.',
  ctaButton:'Выбрать время',telegramInvalid:'Укажите корректный Telegram username (5–32 символа: буквы, цифры или _), либо оставьте поле пустым.'
}
};

const vehicles=[
  {
    name:{de:'Kleinwagen',en:'Small car',ru:'Маленький автомобиль'},
    ex:{de:'VW Polo · Opel Corsa · Fiat 500',en:'VW Polo · Opel Corsa · Fiat 500',ru:'VW Polo · Opel Corsa · Fiat 500'},
    add:0,code:'small'
  },
  {
    name:{de:'Limousine / Kombi',en:'Sedan / Estate',ru:'Седан / универсал'},
    ex:{de:'Mercedes C-Klasse · BMW 3er · VW Passat',en:'Mercedes C-Class · BMW 3 Series · VW Passat',ru:'Mercedes C-Class · BMW 3 Series · VW Passat'},
    add:10,code:'sedan_wagon'
  },
  {
    name:{de:'SUV',en:'SUV',ru:'SUV / кроссовер'},
    ex:{de:'VW Tiguan · BMW X3 · Mercedes GLC',en:'VW Tiguan · BMW X3 · Mercedes GLC',ru:'VW Tiguan · BMW X3 · Mercedes GLC'},
    add:20,code:'suv'
  },
  {
    name:{de:'Van / Transporter',en:'Van / Transporter',ru:'Вэн / транспортер'},
    ex:{de:'VW Caddy · Mercedes Vito · VW Transporter',en:'VW Caddy · Mercedes Vito · VW Transporter',ru:'VW Caddy · Mercedes Vito · VW Transporter'},
    add:35,code:'van'
  }
];

const packs=[
  {
    name:{de:'Interior Refresh',en:'Interior Refresh',ru:'Базовая уборка салона'},
    p:49,code:'refresh',
    d:{
      de:['Innenraum saugen','Müll entfernen','Oberflächen entstauben & abwischen','Scheiben innen reinigen'],
      en:['Vacuum interior','Waste removal','Dust & wipe surfaces','Clean interior glass'],
      ru:['Пылесос салона','Удаление мусора','Пыль и протирка поверхностей','Очистка стёкол изнутри']
    }
  },
  {
    name:{de:'Deep Interior',en:'Deep Interior',ru:'Глубокая уборка салона'},
    p:89,code:'deep',
    d:{
      de:['Alles aus Interior Refresh','Fleckenbehandlung','Polster- & Lederreinigung','Matten & Detailbereiche'],
      en:['Everything in Interior Refresh','Stain treatment','Upholstery & leather cleaning','Mats & detail areas'],
      ru:['Всё из базовой уборки','Обработка пятен','Чистка обивки и кожи','Коврики и труднодоступные зоны']
    }
  },
  {
    name:{de:'Innen + Außen',en:'Inside + Outside',ru:'Салон + кузов'},
    p:129,code:'full',
    d:{
      de:['Alles aus Deep Interior','Außenwäsche von Hand','Felgenreinigung','Scheiben außen','Reifen-Finish'],
      en:['Everything in Deep Interior','Exterior hand wash','Wheel cleaning','Exterior glass','Tyre finish'],
      ru:['Всё из глубокой уборки','Ручная мойка кузова','Очистка дисков','Стёкла снаружи','Финиш для шин']
    }
  },
  {
    name:{de:'VELNARA Complete',en:'VELNARA Complete',ru:'VELNARA Complete'},
    p:179,code:'complete',
    d:{
      de:['Alles aus Innen + Außen','Schonende Motorraum- & Kunststoffpflege','Auspuff & Detailbereiche','Reifenschutz','Abschlusskontrolle'],
      en:['Everything in Inside + Outside','Gentle engine bay & plastic care','Exhaust & detail areas','Tyre protection','Final inspection'],
      ru:['Всё из пакета «Салон + кузов»','Бережная очистка моторного отсека и пластика','Выхлоп и детальные зоны','Защита шин','Финальная проверка']
    }
  }
];

const extras=[
  {name:{de:'Tierhaare',en:'Pet hair',ru:'Шерсть животных'},p:25,code:'pet_hair'},
  {name:{de:'Geruchsneutralisierung',en:'Odour neutralisation',ru:'Нейтрализация запахов'},p:25,code:'odour'},
  {name:{de:'Lederpflege',en:'Leather care',ru:'Уход за кожей'},p:30,code:'leather'},
  {name:{de:'Reifenschutz+',en:'Tyre Protection+',ru:'Защита шин+'},p:15,code:'tyre_protection'}
];

const statuses=[
  ['new','New'],
  ['confirmed','Confirmed'],
  ['on_the_way','On the way'],
  ['in_progress','In progress'],
  ['completed','Completed'],
  ['cancelled','Cancelled']
];

const money=n=>new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n);
const vehicleName=(code,lang='en')=>vehicles.find(x=>x.code===code)?.name?.[lang]||code;
const packageName=(code,lang='en')=>packs.find(x=>x.code===code)?.name?.[lang]||code;
const extraName=(code,lang='en')=>extras.find(x=>x.code===code)?.name?.[lang]||code;

function Logo(){return <div className="brand"><div className="vmark">V</div><div><b>VELNARA</b><small>BERLIN DETAILING</small></div></div>}

function App(){
  const[lang,setLang]=useState('de'),[step,setStep]=useState(1),[v,setV]=useState(null),[p,setP]=useState(null),[xs,setXs]=useState([]),[done,setDone]=useState(null),[admin,setAdmin]=useState(false),[saving,setSaving]=useState(false),[saveError,setSaveError]=useState('');
  const[session,setSession]=useState(null),[orders,setOrders]=useState([]),[adminLoading,setAdminLoading]=useState(false),[adminError,setAdminError]=useState(''),[orderFilter,setOrderFilter]=useState('all'),[installPrompt,setInstallPrompt]=useState(null),[selectedDate,setSelectedDate]=useState(''),[busySlots,setBusySlots]=useState([]),[slotLoading,setSlotLoading]=useState(false),[adminView,setAdminView]=useState('list'),[calendarMonth,setCalendarMonth]=useState(()=>{const d=new Date();return new Date(d.getFullYear(),d.getMonth(),1)});
  const t=copy[lang];

  const total=useMemo(()=>p===null?0:packs[p].p+(v===null?0:vehicles[v].add)+xs.reduce((a,i)=>a+extras[i].p,0),[v,p,xs]);
  const timeSlots=['09:00','11:30','14:00','16:30'];
  const filteredOrders=useMemo(()=>orderFilter==='all'?orders:orders.filter(o=>o.status===orderFilter),[orders,orderFilter]);
  const calendarCells=useMemo(()=>{
    const y=calendarMonth.getFullYear(),m=calendarMonth.getMonth();
    const days=new Date(y,m+1,0).getDate();
    const first=(new Date(y,m,1).getDay()+6)%7;
    const cells=Array(first).fill(null);
    for(let d=1;d<=days;d++)cells.push(new Date(y,m,d));
    return cells;
  },[calendarMonth]);
  const ordersForDate=date=>{
    if(!date)return[];
    const y=date.getFullYear(),m=String(date.getMonth()+1).padStart(2,'0'),d=String(date.getDate()).padStart(2,'0');
    const key=`${y}-${m}-${d}`;
    return orders.filter(o=>o.booking_date===key&&o.status!=='cancelled');
  };


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
    const bookingCode='VL-'+crypto.randomUUID().replace(/-/g,'').slice(0,8).toUpperCase();const payload={booking_code:bookingCode,
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
    if(error){
      console.error('Booking failed',error.message);
      const telegramConstraint=error.code==='23514'&&String(error.message||'').includes('bookings_telegram_username_check');
      setSaveError(error.code==='23505'?t.slotTaken:telegramConstraint?t.telegramInvalid:t.error);
      if(error.code==='23505'&&payload.booking_date===selectedDate)setBusySlots(cur=>cur.includes(String(payload.booking_time).slice(0,5))?cur:[...cur,String(payload.booking_time).slice(0,5)]);
      return
    }
    setDone({id:bookingCode,date:payload.booking_date,time:String(payload.booking_time).slice(0,5),vehicle:vehicles[v].name[lang],package:packs[p].name[lang],total,address:payload.address,name:payload.customer_name});setSelectedDate('');setBusySlots([]);
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

  return <><header><Logo/><nav><a href="#services">{t.navServices}</a><a href="#advantages">{t.navAdvantages}</a><a href="#process">{t.navProcess}</a><a href="#booking">{t.navBook}</a></nav><div className="right"><div className="langs">{['de','en','ru'].map(x=><button key={x} className={lang===x?'active':''} onClick={()=>setLang(x)}>{x.toUpperCase()}</button>)}</div><a className="btn gold" href="#booking">{t.book}</a></div></header>

  <section className="hero"><div className="heroText"><span className="kicker">{t.kicker}</span><h1>{t.hero}</h1><p>{t.lead}</p><div className="heroBtns"><a className="btn gold big" href="#booking">{t.start}<ChevronRight size={18}/></a><a className="btn outline big" href="#services">{t.services}</a></div><div className="trust"><span><CheckCircle2/> {t.trust1}</span><span><CheckCircle2/> {t.trust2}</span><span><CheckCircle2/> {t.trust3}</span></div></div><div className="visual"><div className="bigV">V</div><div className="shine"></div><div className="visualBottom"><b>VELNARA</b><span>BERLIN DETAILING</span></div></div></section>

  <section id="services" className="section"><span className="kicker">01 · DETAILING</span><h2>{t.services}</h2><p className="subline">{t.servicesSub}</p><div className="serviceGrid">{packs.map((x,i)=><article key={x.code} className={i===1?'featured':''}><span className="num">0{i+1}</span><h3>{x.name[lang]}</h3><div className="price">{t.from} {money(x.p)}</div><ul>{x.d[lang].map(y=><li key={y}><CheckCircle2/>{y}</li>)}</ul><a href="#booking" onClick={()=>{setP(i);setStep(v===null?1:3)}}>{t.book}<ChevronRight/></a></article>)}</div></section>

  <section id="why" className="section why"><span className="kicker">02 · VELNARA</span><h2>{t.why}</h2><div className="whygrid"><div><MapPin/><h3>{t.why1}</h3><p>{t.whyDesc1}</p></div><div><ShieldCheck/><h3>{t.why2}</h3><p>{t.whyDesc2}</p></div><div><Sparkles/><h3>{t.why3}</h3><p>{t.whyDesc3}</p></div></div></section>

  <section id="advantages" className="section advantages">
    <div className="sectionIntro">
      <span className="kicker">03 · {t.advantagesKicker}</span>
      <h2>{t.advantagesTitle}</h2>
      <p className="subline">{t.advantagesSub}</p>
    </div>
    <div className="advGrid">
      <article><div className="advIcon"><MapPin/></div><span>01</span><h3>{t.adv1}</h3><p>{t.adv1d}</p></article>
      <article><div className="advIcon"><ShieldCheck/></div><span>02</span><h3>{t.adv2}</h3><p>{t.adv2d}</p></article>
      <article><div className="advIcon"><Sparkles/></div><span>03</span><h3>{t.adv3}</h3><p>{t.adv3d}</p></article>
      <article><div className="advIcon"><CalendarDays/></div><span>04</span><h3>{t.adv4}</h3><p>{t.adv4d}</p></article>
      <article><div className="advIcon"><CheckCircle2/></div><span>05</span><h3>{t.adv5}</h3><p>{t.adv5d}</p></article>
      <article><div className="advIcon"><MessageCircle/></div><span>06</span><h3>{t.adv6}</h3><p>{t.adv6d}</p></article>
    </div>
  </section>

  <section id="process" className="processSection">
    <div className="section processInner">
      <div className="processTop">
        <div><span className="kicker">04 · {t.processKicker}</span><h2>{t.processTitle}</h2></div>
        <p>{t.processSub}</p>
      </div>
      <div className="processGrid">
        <article><div className="stepNo">01</div><Car/><h3>{t.step1}</h3><p>{t.step1d}</p></article>
        <div className="processArrow">→</div>
        <article><div className="stepNo">02</div><CalendarDays/><h3>{t.step2}</h3><p>{t.step2d}</p></article>
        <div className="processArrow">→</div>
        <article><div className="stepNo">03</div><MapPin/><h3>{t.step3}</h3><p>{t.step3d}</p></article>
      </div>
      <div className="processCta">
        <div><h3>{t.ctaTitle}</h3><p>{t.ctaText}</p></div>
        <a className="btn gold big" href="#booking">{t.ctaButton}<ChevronRight size={18}/></a>
      </div>
    </div>
  </section>

  <section id="booking" className="section booking"><div className="bookHead"><span className="kicker">05 · {t.onlineBooking}</span><h2>{t.book}</h2></div>{done?<div className="success"><CheckCircle2 size={52}/><h2>{t.success}</h2><p>{t.success2}</p><div className="confirmCard"><span>{t.bookingReference}</span><strong>{done.id}</strong><div className="confirmGrid"><div><small>{t.date}</small><b>{done.date}</b></div><div><small>{t.time}</small><b>{done.time}</b></div><div><small>{t.vehicleLabel}</small><b>{done.vehicle}</b></div><div><small>{t.packageLabel}</small><b>{done.package}</b></div><div><small>{t.priceLabel}</small><b>{money(done.total)}</b></div><div><small>{t.addressLabel}</small><b>{done.address}</b></div></div></div><button className="btn gold" onClick={()=>{setDone(null);setStep(1);setV(null);setP(null);setXs([]);setSelectedDate('');setBusySlots([])}}>{t.new}</button></div>:<div className="bookGrid"><div className="wizard"><div className="progress">{[1,2,3,4].map(i=><i key={i} className={step>=i?'on':''}/>)}</div>{step===1&&<><h3>{t.vehicle}</h3><div className="choices">{vehicles.map((x,i)=><button key={x.code} className={v===i?'selected':''} onClick={()=>{setV(i);setStep(2)}}><Car/><span><b>{x.name[lang]}</b><small>{x.ex[lang]}{x.add?` · +${money(x.add)}`:''}</small></span></button>)}</div></>}{step===2&&<><h3>{t.package}</h3><div className="choices">{packs.map((x,i)=><button key={x.code} className={p===i?'selected':''} onClick={()=>{setP(i);setStep(3)}}><Sparkles/><span><b>{x.name[lang]}</b><small>{t.from} {money(x.p)}</small></span></button>)}</div><button className="textbtn" onClick={()=>setStep(1)}>← {t.back}</button></>}{step===3&&<><h3>{t.extras}</h3><div className="choices">{extras.map((x,i)=><button key={x.code} className={xs.includes(i)?'selected':''} onClick={()=>setXs(xs.includes(i)?xs.filter(z=>z!==i):[...xs,i])}><span><b>{x.name[lang]}</b><small>+{money(x.p)}</small></span></button>)}</div><div className="actions"><button className="textbtn" onClick={()=>setStep(2)}>← {t.back}</button><button className="btn gold" onClick={()=>setStep(4)}>{t.continue}</button></div></>}{step===4&&<form onSubmit={save}><h3>{t.details}</h3><div className="formgrid"><label>{t.name}<input required name="name"/></label><label>{t.phone}<input required name="phone" type="tel"/></label><label>{t.email}<input name="email" type="email"/></label><label>{t.telegramOptional}<input name="telegram" placeholder="@username" minLength="5" maxLength="33" pattern="@?[A-Za-z0-9_]{5,32}" title={t.telegramInvalid}/></label><label>{t.address}<input required name="address"/></label><label>{t.date}<input required name="date" type="date" value={selectedDate} onChange={e=>setSelectedDate(e.target.value)} min={new Date(Date.now()+86400000).toISOString().slice(0,10)}/></label><label>{t.time}<select required name="time" defaultValue=""><option value="" disabled>{slotLoading?'…':t.chooseTime}</option>{timeSlots.map(slot=><option key={slot} value={slot} disabled={busySlots.includes(slot)}>{slot}{busySlots.includes(slot)?` · ${t.booked}`:''}</option>)}</select></label><label className="wide">{t.notes}<textarea name="notes" rows="3"/></label></div>{saveError&&<p className="formerror">{saveError}</p>}<div className="actions"><button type="button" className="textbtn" onClick={()=>setStep(3)}>← {t.back}</button><button disabled={saving} className="btn gold">{saving?t.sending:t.send}</button></div></form>}</div><aside><h3>{t.summary}</h3>{v!==null&&<Row a={t.vehicle} b={vehicles[v].name[lang]}/>} {p!==null&&<Row a={t.package} b={packs[p].name[lang]}/>} {xs.map(i=><Row key={extras[i].code} a={extras[i].name[lang]} b={'+'+money(extras[i].p)}/>)}<div className="grand"><span>{t.total}</span><b>{money(total)}</b></div><p className="fine">{t.disclaimer}</p></aside></div>}</section>

  <footer><Logo/><span>© 2026 VELNARA · Mobile Detailing Berlin</span><div className="footerActions">{installPrompt&&<button onClick={installApp}><Download/> {t.installApp}</button>}<button onClick={()=>setAdmin(true)}><LayoutDashboard/> {t.admin}</button></div></footer>

  {admin&&<div className="modal"><div className="admin"><button className="close" onClick={()=>setAdmin(false)}><X/></button><div className="adminHead"><Logo/><div><h2>{t.orders}</h2><p>VELNARA operations dashboard</p></div></div>
    {!session?<form className="adminLogin" onSubmit={signIn}><h3>Admin login</h3><label>Email<input required type="email" name="admin_email" autoComplete="username"/></label><label>Password<input required type="password" name="admin_password" autoComplete="current-password"/></label>{adminError&&<p className="formerror">{adminError}</p>}<button disabled={adminLoading} className="btn gold">{adminLoading?'Signing in…':'Sign in'}</button></form>:
    <><div className="adminToolbar"><div><b>{session.user.email}</b><small>Secure admin session</small></div><div className="adminActions"><button className="btn outline" disabled={adminLoading} onClick={loadOrders}><RefreshCw size={16}/>{adminLoading?'Loading…':'Refresh'}</button><button className="btn outline" onClick={signOut}><LogOut size={16}/>Sign out</button></div></div>{adminError&&<p className="formerror">{adminError}</p>}
    <div className="adminStats"><div><span>Total</span><b>{orders.length}</b></div><div><span>New</span><b>{orders.filter(x=>x.status==='new').length}</b></div><div><span>Confirmed</span><b>{orders.filter(x=>x.status==='confirmed').length}</b></div><div><span>Completed</span><b>{orders.filter(x=>x.status==='completed').length}</b></div></div>
    <div className="viewSwitch"><button className={adminView==='list'?'active':''} onClick={()=>setAdminView('list')}><List size={15}/>List</button><button className={adminView==='calendar'?'active':''} onClick={()=>setAdminView('calendar')}><CalendarDays size={15}/>Calendar</button></div>
    {adminView==='calendar'&&<div className="calendarWrap"><div className="calendarHead"><button onClick={()=>setCalendarMonth(new Date(calendarMonth.getFullYear(),calendarMonth.getMonth()-1,1))}>←</button><h3>{calendarMonth.toLocaleDateString(undefined,{month:'long',year:'numeric'})}</h3><button onClick={()=>setCalendarMonth(new Date(calendarMonth.getFullYear(),calendarMonth.getMonth()+1,1))}>→</button></div><div className="calendarGrid"><div className="dow">Mon</div><div className="dow">Tue</div><div className="dow">Wed</div><div className="dow">Thu</div><div className="dow">Fri</div><div className="dow">Sat</div><div className="dow">Sun</div>{calendarCells.map((date,i)=><div key={i} className={'dayCell'+(!date?' emptyDay':'')}><span className="dayNum">{date?date.getDate():''}</span>{date&&ordersForDate(date).map(o=><div className={'calBooking '+o.status} key={o.id}><b>{String(o.booking_time).slice(0,5)}</b><small>{o.customer_name}</small><small>{packageName(o.package_code,'en')}</small></div>)}</div>)}</div></div>}
    {adminView==='list'&&<><div className="orderFilters">{[['all','All'],...statuses].map(([value,label])=><button key={value} className={orderFilter===value?'active':''} onClick={()=>setOrderFilter(value)}>{label}</button>)}</div>
    <div className="tablewrap desktopOrders"><table><thead><tr><th>Booking</th><th>Customer</th><th>Appointment</th><th>Service</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filteredOrders.length===0&&!adminLoading?<tr><td colSpan="7" className="empty">No bookings in this filter.</td></tr>:filteredOrders.map(o=><tr key={o.id}><td><b>{o.booking_code}</b><small>{new Date(o.created_at).toLocaleString()}</small></td><td><b>{o.customer_name}</b><small>{o.phone}</small>{o.email&&<small>{o.email}</small>}{o.telegram_username&&<small>@{o.telegram_username}</small>}<small>{o.address}</small>{o.notes&&<small>Note: {o.notes}</small>}</td><td><b>{o.booking_date}</b><small>{String(o.booking_time).slice(0,5)}</small></td><td><b>{vehicleName(o.vehicle_class,'en')}</b><small>{packageName(o.package_code,'en')}</small>{o.extras?.length>0&&<small>{o.extras.map(code=>extraName(code,'en')).join(', ')}</small>}</td><td><b>{money(o.quoted_price_eur)}</b></td><td><select value={o.status} onChange={e=>updateStatus(o.id,e.target.value)}>{statuses.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></td><td><OrderActions order={o}/></td></tr>)}</tbody></table></div>
    <div className="mobileOrders">{filteredOrders.length===0&&!adminLoading?<div className="emptyCard">No bookings in this filter.</div>:filteredOrders.map(o=><article className="orderCard" key={o.id}><div className="orderCardTop"><div><b>{o.booking_code}</b><small>{new Date(o.created_at).toLocaleString()}</small></div><strong>{money(o.quoted_price_eur)}</strong></div><div className="orderCardGrid"><div><span>Customer</span><b>{o.customer_name}</b><small>{o.phone}</small>{o.email&&<small>{o.email}</small>}{o.telegram_username&&<small>@{o.telegram_username}</small>}</div><div><span>Appointment</span><b>{o.booking_date}</b><small>{String(o.booking_time).slice(0,5)}</small></div><div><span>Service</span><b>{packageName(o.package_code,'en')}</b><small>{vehicleName(o.vehicle_class,'en')}</small></div><div><span>Address</span><b>{o.address}</b>{o.notes&&<small>Note: {o.notes}</small>}</div></div><select className="statusSelect" value={o.status} onChange={e=>updateStatus(o.id,e.target.value)}>{statuses.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select><OrderActions order={o}/></article>)}</div></>}</>}
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
