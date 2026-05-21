import { useState } from "react";

const DB = {
  "電気理論": [
    { term:"オームの法則", reading:"おーむのほうそく", meaning:"電圧・電流・抵抗の関係を示す基本法則", example:"V=IR。抵抗10Ωに2A流すと電圧は20V", mnemonic:"VはIRで覚える。Victor Is Right", keyvalue:"V = I × R" },
    { term:"電力", reading:"でんりょく", meaning:"単位時間に消費されるエネルギー量", example:"100V・5AのヒーターはP=500W", mnemonic:"P=VIは電力会社（P社）がVI（ビジネス）", keyvalue:"P = V × I [W]" },
    { term:"電力量", reading:"でんりょくりょう", meaning:"電力を時間で積分した消費エネルギーの総量", example:"500Wを3時間使うと1500Wh=1.5kWh", mnemonic:"電気代のもとになる量", keyvalue:"W = P × t [Wh]" },
    { term:"力率", reading:"りきりつ", meaning:"皮相電力に対する有効電力の比率", example:"力率0.8では皮相電力の80%しか有効に使えない", mnemonic:"cosθ。θが小さいほど力率が良い", keyvalue:"cos θ = P / S" },
    { term:"インピーダンス", reading:"いんぴーだんす", meaning:"交流回路における電圧と電流の比（抵抗の交流版）", example:"R=3Ω、XL=4ΩならZ=5Ω", mnemonic:"直角三角形で求める。3・4・5の勾股定理", keyvalue:"Z = √(R² + X²) [Ω]" },
    { term:"誘導リアクタンス", reading:"ゆうどうりあくたんす", meaning:"コイルが交流電流の流れを妨げる量", example:"周波数が高いほど誘導リアクタンスも大きくなる", mnemonic:"コイルは高周波を嫌う（止める）", keyvalue:"XL = 2πfL [Ω]" },
    { term:"容量リアクタンス", reading:"ようりょうりあくたんす", meaning:"コンデンサが交流電流の流れを妨げる量", example:"周波数が高いほど容量リアクタンスは小さくなる", mnemonic:"コンデンサは高周波を好む（通す）", keyvalue:"XC = 1/(2πfC) [Ω]" },
    { term:"三相交流の電力", reading:"さんそうこうりゅうのでんりょく", meaning:"三相回路で消費される有効電力", example:"三相200V・10A・力率0.8の電力は約2770W", mnemonic:"√3が出てきたら三相", keyvalue:"P = √3 × V × I × cosθ [W]" },
    { term:"抵抗の並列合成", reading:"ていこうのへいれつごうせい", meaning:"並列接続した抵抗の合成値は各抵抗より小さくなる", example:"2Ωと3Ωの並列合成抵抗は1.2Ω", mnemonic:"並列は積÷和（2つの場合）", keyvalue:"1/R = 1/R₁ + 1/R₂" },
    { term:"電磁誘導", reading:"でんじゆうどう", meaning:"磁束の変化によって起電力が生じる現象", example:"変圧器・発電機の動作原理", mnemonic:"磁束が変化→起電力発生。ファラデーの法則", keyvalue:"e = -N × dΦ/dt [V]" },
    { term:"交流の実効値", reading:"こうりゅうのじっこうち", meaning:"直流の同じ仕事量をする等価な電圧・電流値", example:"家庭用100Vは実効値。最大値は約141V", mnemonic:"実効値 = 最大値 ÷ √2", keyvalue:"V = Vm / √2 ≒ 0.707 × Vm" },
    { term:"コンデンサの直列合成", reading:"こんでんさのちょくれつごうせい", meaning:"直列接続したコンデンサの合成静電容量", example:"2μFと3μFの直列は1.2μF", mnemonic:"抵抗の並列と同じ計算式", keyvalue:"1/C = 1/C₁ + 1/C₂" },
    { term:"基本周波数", reading:"きほんしゅうはすう", meaning:"日本の商用電源周波数（東西で異なる）", example:"東日本50Hz、西日本60Hz", mnemonic:"富士山（静岡）が境界線", keyvalue:"東50Hz / 西60Hz" },
    { term:"キルヒホッフの電流則", reading:"きるひほっふのでんりゅうそく", meaning:"回路の任意の節点に流れ込む電流の総和はゼロ", example:"分岐点に3A流入し2A流出→残り1Aが別経路へ", mnemonic:"節点では電流が出た分だけ入る（収支0）", keyvalue:"ΣI = 0" },
    { term:"最大需要電力", reading:"さいだいじゅようでんりょく", meaning:"需要家が一定時間内に使用する最大電力", example:"幹線の太さを決める基準になる", mnemonic:"需要率×設備容量で求める", keyvalue:"最大需要電力 = 設備容量 × 需要率" },
  ],
  "電気機器・材料・工具": [
    { term:"VVFケーブル", reading:"ぶいぶいえふけーぶる", meaning:"ビニル絶縁ビニルシースケーブル平形。一般住宅配線に最も多用", example:"600Vまで使用可能。埋込配線・露出配線両用", mnemonic:"Flat（平形）のF", keyvalue:"使用電圧 600V以下" },
    { term:"VVRケーブル", reading:"ぶいぶいあーるけーぶる", meaning:"ビニル絶縁ビニルシースケーブル丸形。複数心線を丸く束ねた形状", example:"VVFと同じ用途だが管への通線に適する", mnemonic:"Round（丸形）のR", keyvalue:"使用電圧 600V以下" },
    { term:"CVケーブル", reading:"しーぶいけーぶる", meaning:"架橋ポリエチレン絶縁ビニルシースケーブル。耐熱性が高い", example:"幹線・動力配線に多用。許容温度90℃", mnemonic:"クロス（架橋）のC", keyvalue:"許容温度 90℃" },
    { term:"EMFケーブル", reading:"いーえむえふけーぶる", meaning:"エコケーブル（環境配慮型）。燃焼時にハロゲン系ガスが出ない", example:"学校・病院など公共施設に採用増加", mnemonic:"エコ（環境）のEM", keyvalue:"EM = エコマテリアル" },
    { term:"リングスリーブ", reading:"りんぐすりーぶ", meaning:"電線を接続するための筒状の金属スリーブ。圧着工具で接続する", example:"小・中・大のサイズがあり、電線径と本数で選定", mnemonic:"リング（輪）状のスリーブ", keyvalue:"小：1.6mm×2本等 / マーク○小中大" },
    { term:"差込形コネクタ", reading:"さしこみがたこねくた", meaning:"電線を差し込むだけで接続できる器具。圧着不要", example:"本数に合わせて2〜4線用などを選択", mnemonic:"差し込むだけで接続完了", keyvalue:"圧着工具不要" },
    { term:"PF管", reading:"ぴーえふかん", meaning:"合成樹脂製可とう電線管（フレキシブル）。曲げ加工が容易", example:"コンクリート埋設、露出配管に使用", mnemonic:"Plastic Flexible の略", keyvalue:"自己消火性あり（CD管はなし）" },
    { term:"CD管", reading:"しーでぃーかん", meaning:"合成樹脂製可とう電線管。コンクリート埋設専用（オレンジ色）", example:"コンクリート打設前に配管し埋め込む", mnemonic:"色はオレンジ。コンクリート専用", keyvalue:"コンクリート埋設専用" },
    { term:"圧着ペンチ", reading:"あっちゃくぺんち", meaning:"リングスリーブを電線に圧着して接続するための工具", example:"○小中大のダイスを使い分けて使用", mnemonic:"握る→圧着→接続完了", keyvalue:"JIS C 9711に適合品を使用" },
    { term:"ホルソ", reading:"ほるそ", meaning:"金属板・木板に穴を開ける工具。ノックアウト不要の箇所に使用", example:"分電盤に電線管を取り付ける際の穴あけ", mnemonic:"Hole（穴）を開けるソー（鋸）", keyvalue:"電気ドリルに装着して使用" },
    { term:"リーマ", reading:"りーま", meaning:"金属管の切断面のバリを除去して内面を滑らかにする工具", example:"パイプカッターで切断後に必ずリーマ処理", mnemonic:"リーマ→内面をスムーズに仕上げる", keyvalue:"金属管切断後に必須作業" },
    { term:"ノックアウトパンチャ", reading:"のっくあうとぱんちゃ", meaning:"金属製分電盤・ボックスに穴を開ける工具", example:"電線管の太さに合わせたパンチを選択", mnemonic:"パンチでノックアウト→穴が開く", keyvalue:"油圧式・手動式あり" },
    { term:"ワイヤストリッパ", reading:"わいやすとりっぱ", meaning:"電線の絶縁被覆を剥ぐ専用工具", example:"VVFケーブルの心線を露出させる作業に使用", mnemonic:"Strip（剥く）のストリッパ", keyvalue:"寸法調節機能付きが主流" },
    { term:"電流計の接続", reading:"でんりゅうけいのせつぞく", meaning:"電流計は測定回路に直列に接続する。内部抵抗は小さい", example:"回路を直列に切り断し電流計を挿入する", mnemonic:"電流計は直列（A直）、電圧計は並列（V並）", keyvalue:"直列接続・内部抵抗小" },
    { term:"蛍光灯の安定器", reading:"けいこうとうのあんていき", meaning:"蛍光灯の点灯に必要な電流を安定させる器具", example:"インバータ式は高周波点灯でちらつきが少ない", mnemonic:"ランプを安定して点灯させる", keyvalue:"インバータ式は省エネ効果大" },
  ],
  "電気工事の施工方法": [
    { term:"金属管工事", reading:"きんぞくかんこうじ", meaning:"電線を金属製電線管に収めて配線する工事方法", example:"工場・倉庫など機械的損傷を受けるおそれのある場所に適する", mnemonic:"金属管で電線を守る", keyvalue:"管内の電線本数に制限あり（占積率）" },
    { term:"ケーブル工事", reading:"けーぶるこうじ", meaning:"ケーブルを露出または隠蔽して配線する工事", example:"一般住宅で最もよく使われる工事方法", mnemonic:"VVFケーブルを直接配線する", keyvalue:"支持点間距離 2m以下" },
    { term:"がいし引き工事", reading:"がいしびきこうじ", meaning:"がいしに電線を縛り付けて空間配線する古典的工事", example:"乾燥した場所のみ施工可能", mnemonic:"電線をがいしで宙吊りにする工事", keyvalue:"展開した場所・乾燥した場所のみ" },
    { term:"合成樹脂管工事", reading:"ごうせいじゅしかんこうじ", meaning:"PF管・VE管などプラスチック製管に電線を収める工事", example:"コンクリート埋設にCD管、露出・隠蔽にPF管", mnemonic:"プラスチックの管に通す", keyvalue:"VE管（硬質）：サポート間隔1.5m以下" },
    { term:"電線の許容電流", reading:"でんせんのきょようでんりゅう", meaning:"電線が安全に流せる最大電流値。絶縁物の許容温度で決まる", example:"VVF1.6mmの許容電流は27A（基本値）", mnemonic:"電線は太いほど許容電流大", keyvalue:"1.6mm:27A / 2.0mm:35A" },
    { term:"電線の接続条件", reading:"でんせんのせつぞくじょうけん", meaning:"電線を接続する際に守るべき電気的・機械的条件", example:"電気的抵抗を増やさない・引張強さを20%以上低下させない", mnemonic:"強度・抵抗・絶縁の3条件", keyvalue:"引張強さ低下20%以下" },
    { term:"接地工事の省略", reading:"せっちこうじのしょうりゃく", meaning:"漏電遮断器設置などの条件を満たせば接地工事を省略できる", example:"30mA以下の漏電遮断器設置でD種接地省略可", mnemonic:"漏電遮断器があれば安全→省略OK", keyvalue:"0.1秒以内動作の漏電遮断器" },
    { term:"金属管の曲げ加工", reading:"きんぞくかんのまげかこう", meaning:"金属管をパイプベンダーで曲げる作業", example:"曲げ半径は管内径の6倍以上が原則", mnemonic:"管を急に曲げると電線が傷む", keyvalue:"曲げ半径：管内径の6倍以上" },
    { term:"ジョイントボックス", reading:"じょいんとぼっくす", meaning:"電線の接続・分岐点を収める金属製または樹脂製のボックス", example:"配線の接続部は必ずボックス内で行う", mnemonic:"接続（ジョイント）をボックスで保護", keyvalue:"接続部は露出不可→必ずボックス内" },
    { term:"地中電線路", reading:"ちちゅうでんせんろ", meaning:"地中に埋設して電気を送る電線路", example:"道路横断部はトラフや管路式が標準", mnemonic:"地中→管で保護", keyvalue:"埋設深さ：直埋60cm以上・管路式30cm以上" },
    { term:"負荷の分岐回路", reading:"ふかのぶんきかいろ", meaning:"分電盤から各コンセント・照明へ分岐する回路", example:"1回路あたりの最大電流と使用電線径が規定される", mnemonic:"分電盤→ブレーカ→コンセント", keyvalue:"20A回路：1.6mm以上 / 30A回路：2.6mm以上" },
    { term:"二重天井内の配線", reading:"にじゅうてんじょうないのはいせん", meaning:"二重天井の内部空間を使った隠蔽配線", example:"ケーブル工事または合成樹脂管工事が適用可", mnemonic:"天井裏も点検できる→ケーブル直敷き可", keyvalue:"人が触れない構造ならケーブル工事OK" },
    { term:"配線用遮断器の定格", reading:"はいせんようしゃだんきのていかく", meaning:"電路を保護する遮断器の電流容量", example:"20A分岐回路には20Aの配線用遮断器を設置", mnemonic:"過電流を遮断してケーブルを保護", keyvalue:"分岐回路の種類で決まる" },
    { term:"フロアダクト工事", reading:"ふろあだくとこうじ", meaning:"床面に埋め込んだ金属ダクトに電線を収める工事", example:"事務所のフロアコンセント配線に使用", mnemonic:"床（フロア）のダクト", keyvalue:"コンクリート床埋設専用" },
    { term:"低圧屋側配線", reading:"ていあつおくそくはいせん", meaning:"建物の外壁に沿って設置する低圧配線", example:"ケーブル工事または合成樹脂管工事が主な方法", mnemonic:"外壁沿いの配線", keyvalue:"がいし引きは可・金属管も可" },
  ],
  "配線図・図記号": [
    { term:"単極スイッチ", reading:"たんきょくすいっち", meaning:"照明などのON/OFFに使う最も基本的なスイッチ", example:"壁面取付の点滅器として住宅に多用", mnemonic:"横線に小さい円がついた記号", keyvalue:"JIS C 0617 に規定" },
    { term:"3路スイッチ", reading:"さんろすいっち", meaning:"2か所から同一照明を操作できるスイッチ。階段・廊下に使用", example:"スイッチ記号の右上に「3」と表記", mnemonic:"3路スイッチ2個で1系統を制御", keyvalue:"記号：「3」の添字あり" },
    { term:"4路スイッチ", reading:"よんろすいっち", meaning:"3か所以上から照明を操作する際に3路スイッチと組み合わせて使用", example:"3路×2個＋4路×(n-2)個で任意の多箇所制御", mnemonic:"3路の間に4路を挟む", keyvalue:"記号：「4」の添字あり" },
    { term:"引掛シーリング", reading:"ひっかけしーりんぐ", meaning:"天井に取付け、照明器具を引掛けて接続するアウトレット", example:"住宅の居室天井照明の取付口として標準", mnemonic:"天井に○と十字の記号", keyvalue:"丸形と角形の2種" },
    { term:"配線用遮断器記号", reading:"はいせんようしゃだんききごう", meaning:"過電流保護のための遮断器を示す図記号", example:"分電盤内の各回路ブレーカを表す", mnemonic:"ボックス内に「B」または矩形記号", keyvalue:"MCBとも呼ぶ" },
    { term:"漏電遮断器記号", reading:"ろうでんしゃだんききごう", meaning:"漏電保護のための遮断器を示す図記号", example:"コンセント回路・浴室・洗面などに設置義務", mnemonic:"配線用遮断器に「漏」の文字を添える", keyvalue:"動作時間0.1秒以内・30mA以下" },
    { term:"接地端子記号", reading:"せっちたんしきごう", meaning:"接地線の接続点を示す記号", example:"洗面所・台所などのコンセントに付属", mnemonic:"下向き三角形または「E」", keyvalue:"⊥（または E）" },
    { term:"コンセント記号", reading:"こんせんときごう", meaning:"電気器具のプラグを差し込む口の図記号", example:"○に横線2本が基本形。接地極付は「E」を添える", mnemonic:"○に縦横線でコンセント", keyvalue:"接地極付：Eまたはⓔ" },
    { term:"電力量計記号", reading:"でんりょくりょうけいきごう", meaning:"電気使用量を積算計量するメーターの図記号", example:"電力会社が設置し、供給地点に取り付ける", mnemonic:"「Wh」または○に縦線記号", keyvalue:"記号：Wh（積算電力計）" },
    { term:"自動点滅器記号", reading:"じどうてんめつききごう", meaning:"明暗に応じて自動点滅するセンサースイッチの図記号", example:"屋外照明・街路灯に使用。暗くなると点灯", mnemonic:"スイッチ記号に「A」添字", keyvalue:"記号：スイッチ+「A」" },
    { term:"熱線式自動スイッチ", reading:"ねっせんしきじどうすいっち", meaning:"人体の放射熱を検知して自動点灯するスイッチ", example:"玄関・トイレ・廊下の自動点灯に使用", mnemonic:"人が来ると点灯→熱（赤外線）検知", keyvalue:"記号：スイッチ+「熱」または「R」" },
    { term:"タイムスイッチ記号", reading:"たいむすいっちきごう", meaning:"設定時刻に自動でON/OFFするスイッチの図記号", example:"街路灯・自動販売機の時間制御に使用", mnemonic:"スイッチ記号に「T」添字", keyvalue:"記号：スイッチ+「T」" },
    { term:"単線図と複線図", reading:"たんせんずとふくせんず", meaning:"単線図は電路を1本線で簡略表示。複線図は実配線を全線表示", example:"施工時は単線図→複線図に変換して作業", mnemonic:"単線図=設計図、複線図=施工図", keyvalue:"技能試験：複線図作成が必須" },
    { term:"分電盤記号", reading:"ぶんでんばんきごう", meaning:"主幹ブレーカと分岐ブレーカをまとめた配電盤の図記号", example:"住宅では玄関横や廊下に設置することが多い", mnemonic:"四角に縦線で幹線と分岐を表す", keyvalue:"MBPまたは□で表す" },
    { term:"パイロットランプ", reading:"ぱいろっとらんぷ", meaning:"スイッチの状態（ON/OFF）を表示するための小型ランプ", example:"常時点灯型・同時点滅型・異時点滅型の3種", mnemonic:"スイッチ記号に「P」添字", keyvalue:"常時点灯・同時点滅・異時点滅" },
  ],
  "法令・規則": [
    { term:"第二種電気工事士", reading:"だいにしゅでんきこうじし", meaning:"一般用電気工作物の電気工事を行うことができる国家資格", example:"住宅・小規模商店の配線工事を行える", mnemonic:"600V以下の一般電気工作物が担当範囲", keyvalue:"担当：600V以下一般用電気工作物" },
    { term:"一般用電気工作物", reading:"いっぱんようでんきこうさくぶつ", meaning:"電力会社から低圧で受電し、主に住宅・小規模施設が対象", example:"最大電力500kW未満・低圧受電が条件", mnemonic:"家庭・小規模店舗＝一般用", keyvalue:"低圧受電・最大500kW未満" },
    { term:"低圧の定義", reading:"ていあつのていぎ", meaning:"電気設備技術基準で定める電圧の区分のひとつ", example:"直流750V以下・交流600V以下が低圧", mnemonic:"家庭用（交流100/200V）は低圧。600で覚える", keyvalue:"交流600V以下 / 直流750V以下" },
    { term:"高圧の定義", reading:"こうあつのていぎ", meaning:"低圧を超え7000V以下の電圧区分", example:"工場・ビルへの配電に使われる電圧範囲", mnemonic:"低圧の上が高圧。7000Vが上限", keyvalue:"600V超〜7000V以下（交流）" },
    { term:"電気用品安全法", reading:"でんきようひんあんぜんほう", meaning:"電気用品の製造・販売に関する安全基準を定めた法律", example:"PSEマークのない電気用品は販売禁止", mnemonic:"PSEマーク＝電安法の証", keyvalue:"特定電気用品：◇PSE / 一般：○PSE" },
    { term:"絶縁抵抗の基準", reading:"ぜつえんていこうのきじゅん", meaning:"電路の絶縁状態を確認するための最低抵抗値", example:"対地電圧150V以下の回路は0.1MΩ以上", mnemonic:"150V以下→0.1、150V超300V以下→0.2、300V超→0.4", keyvalue:"0.1 / 0.2 / 0.4 [MΩ]" },
    { term:"電気工事業法", reading:"でんきこうじぎょうほう", meaning:"電気工事業を営む者の登録・届出を定めた法律", example:"登録電気工事業者は都道府県知事への登録が必要", mnemonic:"工事業を営むには登録が必要", keyvalue:"登録：都道府県知事（1都道府県の場合）" },
    { term:"定期検査", reading:"ていきけんさ", meaning:"一般用電気工作物の安全確認のための定期的な検査", example:"電力会社が4年ごとに実施する義務がある", mnemonic:"4年に1回は忘れずに", keyvalue:"4年以内ごとに1回" },
    { term:"電気主任技術者", reading:"でんきしゅにんぎじゅつしゃ", meaning:"自家用電気工作物の工事・維持・運用を監督する者", example:"事業場ごとに選任し、国へ届け出が必要", mnemonic:"自家用には主任技術者が必要", keyvalue:"第一種〜第三種の3区分" },
    { term:"特定電気用品", reading:"とくていでんきようひん", meaning:"危険・障害の発生するおそれが多い電気用品", example:"電線・ヒューズ・漏電遮断器など", mnemonic:"危険が多いもの→◇PSEマーク（菱形）", keyvalue:"◇PSEマーク（ひし形）" },
    { term:"電気設備技術基準", reading:"でんきせつびぎじゅつきじゅん", meaning:"電気設備の安全確保のための技術的基準を定めた省令", example:"電路の絶縁・接地・離隔距離など全般を規定", mnemonic:"電技（でんぎ）と略す", keyvalue:"経済産業省令" },
    { term:"漏電遮断器の設置義務", reading:"ろうでんしゃだんきのせっちぎむ", meaning:"水気のある場所・金属製外箱の機器には漏電遮断器が必要", example:"洗面所・浴室・台所などのコンセント回路", mnemonic:"水＋電気は危険→必ず漏電遮断器", keyvalue:"30mA以下・0.1秒以内動作" },
    { term:"電路の対地電圧制限", reading:"でんろのたいちでんあつせいげん", meaning:"住宅の屋内電路は原則として対地電圧150V以下に制限", example:"単相3線式の中性線欠相事故対策も関連", mnemonic:"家庭の屋内は150V以下が基本", keyvalue:"屋内電路：対地電圧150V以下" },
    { term:"自家用電気工作物", reading:"じかようでんきこうさくぶつ", meaning:"高圧・特別高圧で受電する施設、または発電設備を持つ施設", example:"工場・ビルなど。第一種電気工事士の作業範囲", mnemonic:"高圧受電＝自家用（第一種の担当）", keyvalue:"高圧以上または500kW以上" },
    { term:"過電流遮断器の定格", reading:"かでんりゅうしゃだんきのていかく", meaning:"電路を過電流から保護するための遮断器の電流容量", example:"コードの許容電流の範囲内で設置", mnemonic:"電線の許容電流を超えない容量に設定", keyvalue:"幹線保護は電線許容電流の2.5倍以下" },
  ],
  "接地工事": [
    { term:"A種接地工事", reading:"えーしゅせっちこうじ", meaning:"高圧・特別高圧機器の金属製外箱などに施す最も厳しい接地", example:"高圧変圧器の外箱・高圧電動機の外箱", mnemonic:"A（一番厳しい）→抵抗値が一番小さい", keyvalue:"接地抵抗 10Ω以下" },
    { term:"B種接地工事", reading:"びーしゅせっちこうじ", meaning:"高圧と低圧を結合する変圧器の低圧側中性点に施す接地", example:"柱上変圧器の低圧側中性線接地", mnemonic:"Bは変圧器のBridge（橋渡し）", keyvalue:"150/Ig [Ω]以下" },
    { term:"C種接地工事", reading:"しーしゅせっちこうじ", meaning:"300Vを超える低圧機器の金属製外箱などに施す接地", example:"三相200V電動機の外箱（対地電圧200V超の場合）", mnemonic:"C→Careful（注意が必要な300V超）", keyvalue:"接地抵抗 10Ω以下（漏電遮断器あり500Ω以下）" },
    { term:"D種接地工事", reading:"でぃーしゅせっちこうじ", meaning:"300V以下の低圧機器の金属製外箱などに施す接地", example:"単相100V・200Vのコンセント・機器外箱", mnemonic:"D→Day（日常）の家電製品の接地", keyvalue:"接地抵抗 100Ω以下（漏電遮断器あり500Ω以下）" },
    { term:"接地線の太さ（D種）", reading:"せっちせんのふとさ", meaning:"D種接地工事で使用する接地線の最小許容断面積", example:"一般家庭のエアコン・洗濯機接地に使用", mnemonic:"D種は1.6mm以上の緑または黄/緑", keyvalue:"直径1.6mm以上（軟銅線）" },
    { term:"接地極", reading:"せっちきょく", meaning:"地中に埋設して大地に電気を逃がすための導体", example:"銅板・銅管・接地棒などを使用", mnemonic:"大地に打ち込む金属棒＝アース電極", keyvalue:"銅板：0.9mm以上 / 銅棒：8mm以上" },
    { term:"B種接地の計算", reading:"びーしゅせっちのけいさん", meaning:"B種接地抵抗値は高圧1線地絡電流Igから計算する", example:"Ig=5Aの場合、R=150/5=30Ω以下", mnemonic:"150÷地絡電流=接地抵抗の上限値", keyvalue:"R ≤ 150/Ig [Ω]" },
    { term:"接地工事の省略条件", reading:"せっちこうじのしょうりゃくじょうけん", meaning:"漏電遮断器の設置などで接地工事を省略できる条件", example:"C種・D種は0.1秒以内動作の漏電遮断器設置で500Ω以下に緩和", mnemonic:"漏電遮断器で検知→省略または緩和", keyvalue:"漏電遮断器（0.1秒・30mA）設置→500Ω以下" },
    { term:"水気のある場所の接地", reading:"みずけのあるばしょのせっち", meaning:"浴室・台所など水気が多い場所の機器は必ず接地が必要", example:"洗濯機・浴室暖房機は接地が義務", mnemonic:"水＋電気＝感電リスク大→接地必須", keyvalue:"D種接地が必須（省略不可）" },
    { term:"変圧器のB種接地目的", reading:"へんあつきのびーしゅせっちもくてき", meaning:"高圧側が混触した際に低圧側の電位上昇を抑制するため", example:"柱上変圧器で高低圧混触事故が起きても低圧機器を保護", mnemonic:"混触しても低圧側の電位が上がらないようにする", keyvalue:"混触時の低圧側電位上昇を150V以下に抑制" },
    { term:"二重絶縁と接地省略", reading:"にじゅうぜつえんとせっちしょうりゃく", meaning:"二重絶縁構造の機器は接地工事を省略できる", example:"電動工具・ハンドドリルなど可搬形機器", mnemonic:"二重絶縁＝外箱への漏電が起きにくい構造", keyvalue:"二重絶縁器具→D種接地省略可" },
    { term:"接地線の色", reading:"せっちせんのいろ", meaning:"接地線には緑または黄/緑の配色を使用する", example:"コンセントの接地極へ接続する電線は緑色", mnemonic:"大地＝緑（自然・草）", keyvalue:"緑または緑/黄のツートン" },
  ],
};

const CATEGORIES = [
  { id: "電気理論", label: "電気理論", desc: "公式・定理・単位" },
  { id: "電気機器・材料・工具", label: "機器・材料・工具", desc: "名称・用途・識別" },
  { id: "電気工事の施工方法", label: "施工方法", desc: "工事種別・施工規定" },
  { id: "配線図・図記号", label: "配線図・図記号", desc: "図記号の名称と意味" },
  { id: "法令・規則", label: "法令・規則", desc: "数値・定義・義務" },
  { id: "接地工事", label: "接地工事", desc: "接地種別・抵抗値・用途" },
];

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function pick(id, n = 10) { return shuffle(DB[id]).slice(0, n); }

function HomeScreen({ onSelect }) {
  return (
    <div>
      <h2 className="sr-only">第二種電気工事士 暗記カード</h2>
      <div style={{ borderBottom: "2px solid var(--color-text-primary)", paddingBottom: "12px", marginBottom: "1.5rem" }}>
        <p style={{ margin: "0 0 2px", fontSize: "11px", letterSpacing: "0.12em", color: "var(--color-text-secondary)", fontWeight: 500 }}>DENKIKOUJI · FLASHCARD</p>
        <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 500, color: "var(--color-text-primary)", lineHeight: 1.2 }}>
          第二種電気工事士<br />暗記カード
        </h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {CATEGORIES.map((cat, i) => (
          <div key={cat.id} onClick={() => onSelect(cat)}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 4px", borderBottom: "0.5px solid var(--color-border-tertiary)", cursor: "pointer", transition: "opacity 0.1s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{ fontSize: "13px", color: "var(--color-text-tertiary)", fontWeight: 500, minWidth: "16px" }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p style={{ margin: "0 0 2px", fontSize: "15px", fontWeight: 500, color: "var(--color-text-primary)" }}>{cat.label}</p>
                <p style={{ margin: 0, fontSize: "12px", color: "var(--color-text-secondary)" }}>{cat.desc}　全{DB[cat.id].length}枚</p>
              </div>
            </div>
            <i className="ti ti-chevron-right" style={{ fontSize: "16px", color: "var(--color-text-tertiary)" }} aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CardItem({ card, index, isKnown, onToggle, mode }) {
  const [revealed, setRevealed] = useState(false);
  const showBody = mode === "学習" || revealed;

  return (
    <div style={{
      background: "var(--color-background-primary)",
      border: `0.5px solid ${isKnown ? "#534AB7" : "var(--color-border-secondary)"}`,
      borderRadius: "var(--border-radius-lg)",
      overflow: "hidden",
      transition: "border-color 0.2s",
    }}>
      <div style={{ display: "flex", alignItems: "stretch" }}>
        <div style={{ width: "4px", background: isKnown ? "#534AB7" : "var(--color-border-tertiary)", flexShrink: 0, transition: "background 0.2s" }} />
        <div style={{ flex: 1, padding: "1rem 1rem 1rem 1rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
            <div>
              <p style={{ margin: "0 0 2px", fontSize: "22px", fontWeight: 500, color: "var(--color-text-primary)", lineHeight: 1.2 }}>
                {card.term}
              </p>
              {card.reading && (
                <p style={{ margin: 0, fontSize: "12px", color: "var(--color-text-tertiary)" }}>{card.reading}</p>
              )}
            </div>
            <button onClick={() => onToggle(index)} style={{
              flexShrink: 0,
              width: "32px", height: "32px",
              background: isKnown ? "#534AB7" : "var(--color-background-secondary)",
              color: isKnown ? "#EEEDFE" : "var(--color-text-tertiary)",
              border: isKnown ? "none" : "0.5px solid var(--color-border-secondary)",
              borderRadius: "var(--border-radius-md)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s", fontSize: "14px",
            }}>
              <i className={`ti ti-${isKnown ? "check" : "bookmark"}`} aria-hidden="true" />
            </button>
          </div>

          {mode === "テスト" && !revealed && (
            <button onClick={() => setRevealed(true)} style={{
              marginTop: "10px", padding: "7px 14px",
              background: "none", border: "0.5px solid var(--color-border-secondary)",
              borderRadius: "var(--border-radius-md)", cursor: "pointer",
              fontSize: "12px", color: "var(--color-text-secondary)",
              display: "flex", alignItems: "center", gap: "5px",
            }}>
              <i className="ti ti-eye" style={{ fontSize: "13px" }} aria-hidden="true" />
              答えを見る
            </button>
          )}

          {showBody && (
            <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "0.5px solid var(--color-border-tertiary)" }}>
              <p style={{ margin: "0 0 10px", fontSize: "15px", color: "var(--color-text-primary)", lineHeight: 1.7, fontWeight: 500 }}>
                {card.meaning}
              </p>
              {card.keyvalue && (
                <span style={{
                  display: "inline-block", marginBottom: "10px",
                  fontSize: "13px", fontWeight: 500, padding: "3px 10px",
                  background: "var(--color-background-info)", color: "var(--color-text-info)",
                  border: "0.5px solid var(--color-border-info)",
                  borderRadius: "var(--border-radius-md)",
                }}>{card.keyvalue}</span>
              )}
              {card.example && (
                <p style={{
                  margin: "0 0 8px", fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: 1.7,
                  padding: "8px 10px", background: "var(--color-background-secondary)",
                  borderRadius: "var(--border-radius-md)", borderLeft: "3px solid var(--color-border-secondary)",
                }}>{card.example}</p>
              )}
              {card.mnemonic && (
                <p style={{
                  margin: 0, fontSize: "12px", color: "#3C3489", lineHeight: 1.7,
                  padding: "8px 10px", background: "#EEEDFE", borderRadius: "var(--border-radius-md)",
                }}>
                  <i className="ti ti-bulb" style={{ marginRight: "5px", fontSize: "12px" }} aria-hidden="true" />
                  {card.mnemonic}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ScrollScreen({ deck, known, onToggle, mode, onModeChange, onBack, onShuffle, category }) {
  const knownCount = known.filter(Boolean).length;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: "4px", padding: 0 }}>
          <i className="ti ti-arrow-left" style={{ fontSize: "14px" }} aria-hidden="true" />
          {category?.label}
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
            <span style={{ color: "#534AB7", fontWeight: 500 }}>{knownCount}</span>/{deck.length}
          </span>
          <button onClick={onShuffle} style={{ background: "none", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", cursor: "pointer", padding: "5px 8px", fontSize: "12px", color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: "4px" }}>
            <i className="ti ti-arrows-shuffle" style={{ fontSize: "13px" }} aria-hidden="true" />
            シャッフル
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "6px", marginBottom: "1.25rem" }}>
        {["学習", "テスト"].map(m => (
          <button key={m} onClick={() => onModeChange(m)} style={{
            flex: 1, padding: "8px",
            background: mode === m ? "var(--color-text-primary)" : "var(--color-background-secondary)",
            color: mode === m ? "var(--color-background-primary)" : "var(--color-text-secondary)",
            border: "0.5px solid var(--color-border-secondary)",
            borderRadius: "var(--border-radius-md)",
            fontSize: "13px", fontWeight: mode === m ? 500 : 400, cursor: "pointer",
          }}>{m}モード</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {deck.map((card, i) => (
          <CardItem
            key={`${card.term}-${i}`}
            card={card}
            index={i}
            isKnown={known[i]}
            onToggle={onToggle}
            mode={mode}
          />
        ))}
      </div>

      <div style={{ marginTop: "1.5rem", padding: "1rem", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-lg)", textAlign: "center" }}>
        <p style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: 500, color: "var(--color-text-primary)" }}>
          {knownCount} / {deck.length}
        </p>
        <p style={{ margin: 0, fontSize: "13px", color: "var(--color-text-secondary)" }}>
          {Math.round(knownCount / deck.length * 100)}% 習得済み
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [category, setCategory] = useState(null);
  const [deck, setDeck] = useState([]);
  const [known, setKnown] = useState([]);
  const [mode, setMode] = useState("学習");

  const startDeck = (cat, cards) => {
    setCategory(cat);
    setDeck(cards);
    setKnown(Array(cards.length).fill(false));
    setMode("学習");
    setScreen("scroll");
  };

  const handleSelect = (cat) => startDeck(cat, pick(cat.id));

  const toggleKnown = (idx) =>
    setKnown(prev => prev.map((v, i) => i === idx ? !v : v));

  const handleShuffle = () => startDeck(category, shuffle(DB[category.id]).slice(0, 10));

  return (
    <div style={{ fontFamily: "var(--font-sans)", padding: "1.5rem 0", maxWidth: "600px", margin: "0 auto" }}>
      {screen === "home" && <HomeScreen onSelect={handleSelect} />}
      {screen === "scroll" && (
        <ScrollScreen
          deck={deck}
          known={known}
          onToggle={toggleKnown}
          mode={mode}
          onModeChange={setMode}
          onBack={() => setScreen("home")}
          onShuffle={handleShuffle}
          category={category}
        />
      )}
    </div>
  );
}
