# AI4T Video Review — Feedback Template

Hi! Hvala što si pristala pregledati 33 video drafta za AI4Teachers projekt.

## Što treba pregledati

Za svaku lekciju, pogledaj cijeli video (~2-3 min) i provjeri:

1. **Vizualno** — preklapa li se tekst? Reže li se s ekrana? Animacije čiste?
2. **Audio sync** — narrative se poklapa s onim što se vidi na ekranu?
3. **Transicije** — prijelaz iz scene u scenu OK ili preoštro?
4. **Sadržaj** — je li napisano točno? Nedostaje li ključna ideja iz markdown lekcije?
5. **Sal izgovor** — ima li krivo izgovorenih imena alata, akronima (GPT, LLM), termina?
6. **Tagline efekat** — zapamti li se zatvarajuća rečenica (zadnje 3-5 s)?

## Kako zapisati feedback

Otvori priloženi Google Sheet ([link]) i za svaki problem unesi **jedan red**.

Stupci:

| Stupac | Što unijeti | Primjer |
|---|---|---|
| **Lesson** | Code lekcije iz naslova YouTube videa | `C1L03` |
| **Time** | Vrijeme u videu (m:ss) ili `—` ako je problem cijele lekcije | `0:42` |
| **Type** | Što vrsta problema (odaberi iz dropdown-a) | `Visual` |
| **Severity** | Koliko je važno (dropdown) | `High` |
| **What I saw** | Kratko opiši što vidiš/čuješ | `Tagline preklapa s donjom karticom` |
| **Suggested fix** | Opcionalno — ako imaš ideju kako popraviti | `Pomaknuti tagline 30 px gore` |

### Type opcije

- **Visual** — sve što se odnosi na sliku: preklapanje, rezanje, krivu animaciju, lošu boju
- **Audio** — problemi s audio kvalitetom, tempom, glasnoćom
- **Pronunciation** — Sal je krivo izgovorio riječ
- **Transition** — prijelaz scena loš (prebrz, prepor, zvuk se sječe)
- **Content** — sadržajna greška, netočna tvrdnja, nedostaje važan koncept
- **Tone** — preformalno, prebavanopisno, neprikladan registar
- **Other** — sve ostalo

### Severity opcije

- **High** — blocker, ne smije ići javno ovako (npr. krivu informaciju, gravna vizualna greška)
- **Med** — treba popraviti prije release-a (npr. nepoklapanje audio/slide, krivo ime alata)
- **Low** — nice-to-have, može i kasnije (npr. tagline koji bi bio jači)

### Primjeri dobro napisanog feedback-a

```
C1L03  0:42  Visual    High  Card overlaps headline u Three Myths sceni
C2L05  1:12  Pronunc.  Med   Sal kaže "G-P-T" — treba biti "GPT"
C3L08  2:08  Content   Med   Tvrdi DPIA je uvijek obavezna — samo za high-risk
C1L07  —     Tone      Low   Cijela lekcija predugačka, treba šire pause između scena
```

### Što NE moraš raditi

- **Ne piši cijele rečenice "ovo bi se moglo poboljšati ako..."** — kratko je bolje
- **Ne predlaži dizajn promjene koje zahtijevaju re-render cijelog projekta** (svi videi koriste isti template library, jedna promjena ide kroz sve)
- **Ne razmišljaj o jeziku** — sve je na engleskom za sada; prijevodi su druga faza

## Kako organizirati svoj review

Predlažem ovaj redoslijed (od jednostavnijih do težih):

1. **Cat 4 — AI for All Learners** (7 lekcija) — najkonkretniji sadržaj
2. **Cat 1 — AI Literacy** (8 lekcija) — teoretski koncepti
3. **Cat 2 — Practical AI Skills** (9 lekcija) — tool demos (C2L05-09 su najteže jer nemaju prave screenshote)
4. **Cat 3 — Considerations on AI** (9 lekcija) — najteži sadržaj

Ukupno ~33 × 3 min = ~100 min gledanja + feedback. Razdvoji u 2-3 sesije.

## Kontakt

Pitanja ili nedoumica — javi mi. Bolje pitati nego pogriješiti.

Hvala!
