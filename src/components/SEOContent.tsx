'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function ExpandableSection({ title, children, defaultOpen = false }: ExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left hover:text-emerald-600 transition-colors"
      >
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[5000px] pb-6' : 'max-h-0'
        }`}
      >
        <div className="prose prose-slate max-w-none text-slate-600">
          {children}
        </div>
      </div>
    </div>
  );
}

export function SEOContent() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your Guide to Roof Estimates
            </h2>
            <p className="text-xl text-slate-600">
              Learn about roof costs, how to get estimates, and how to find a good roofer
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 md:p-8">
            <ExpandableSection title="How Much Does a New Roof Cost in 2025?" defaultOpen={true}>
              <p>
                <strong>A new roof costs $8,000 to $25,000 for most homes.</strong> The average price is $12,000 to $15,000. This is for a regular house with shingle roofing.
              </p>
              <p>
                Knowing what affects the price helps you plan. Here is what changes your cost:
              </p>
              <h4>Roof Size</h4>
              <p>
                Roofers measure roofs in "squares." One square equals 100 square feet. Most homes have 15 to 30 squares. Bigger roofs cost more because they need more materials and work.
              </p>
              <p>
                Our free tool measures your roof from satellite photos. No one needs to climb on your roof.
              </p>
              <h4>Roof Materials</h4>
              <p>
                What your roof is made of changes the price a lot. Here is what each type costs:
              </p>
              <ul>
                <li><strong>Basic Shingles:</strong> $3-$5 per sq ft (cheapest, lasts 15-20 years)</li>
                <li><strong>Nice Shingles:</strong> $4-$7 per sq ft (most popular, lasts 25-30 years)</li>
                <li><strong>Metal Roofing:</strong> $8-$16 per sq ft (very strong, lasts 40-70 years)</li>
                <li><strong>Tile Roofing:</strong> $10-$20 per sq ft (fancy, lasts 50-100 years)</li>
                <li><strong>Slate Roofing:</strong> $15-$30 per sq ft (top quality, lasts 75-150+ years)</li>
              </ul>
              <h4>Roof Shape</h4>
              <p>
                Steep roofs cost more. They need special safety gear and take longer to do. Simple flat roofs cost less than roofs with many angles and peaks.
              </p>
              <h4>Where You Live</h4>
              <p>
                Prices change by area. Big cities usually cost more than small towns. Places with lots of storms may have higher prices. Our tool uses your location to give you the right price.
              </p>
              <h4>Taking Off the Old Roof</h4>
              <p>
                Most jobs need to remove the old roof first. This adds $1 to $3 per square foot. Some roofers will put new shingles over old ones to save money. But this does not always follow the rules.
              </p>
            </ExpandableSection>

            <ExpandableSection title="What Is a Roof Estimate?">
              <p>
                <strong>A roof estimate tells you how much it will cost</strong> to fix or replace your roof. Getting a good estimate is the first step. Without one, you might pay too much or get surprised by costs.
              </p>
              <h4>Ways to Get a Roof Estimate</h4>
              <p>
                <strong>Online Estimates (Like Ours):</strong> Type your address. We use satellite photos and smart tools to measure your roof. You get a price in about 60 seconds. This is great for planning your budget.
              </p>
              <p>
                <strong>In-Person Estimates:</strong> A roofer comes to your home. They look at your roof and give you a price. This takes longer but can be more exact. The roofer can see things that satellites cannot.
              </p>
              <p>
                <strong>Insurance Estimates:</strong> If a storm damaged your roof, your insurance company sends someone to look. They decide how much the insurance will pay.
              </p>
              <h4>Why Get More Than One Estimate?</h4>
              <p>
                Experts say to get at least three estimates. This helps you:
              </p>
              <ul>
                <li>Know what is a fair price in your area</li>
                <li>Compare materials and promises from different roofers</li>
                <li>Spot roofers who charge too much</li>
                <li>Find the best deal for your money</li>
                <li>Watch out for prices that are way too low (they might cut corners)</li>
              </ul>
              <p>
                Our free estimate gives you a starting point. Use it when you talk to roofers to make sure their prices are fair.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Signs You Need a New Roof">
              <p>
                Knowing when you need a new roof saves money. Fix problems before they damage the inside of your home. Here is what to watch for:
              </p>
              <h4>How Old Is Your Roof?</h4>
              <p>
                Most shingle roofs last 20-30 years. If yours is getting close to that age, get an estimate. Even if it looks okay, it might be time. A new roof before leaks start protects your home better.
              </p>
              <h4>What to Look For Outside</h4>
              <p>
                Walk around your home and check for:
              </p>
              <ul>
                <li><strong>Curling shingles:</strong> Edges curling up means they are old</li>
                <li><strong>Missing shingles:</strong> Gaps let water get in</li>
                <li><strong>Cracked shingles:</strong> Brittle shingles cannot protect your home</li>
                <li><strong>Gritty bits in gutters:</strong> Shingles losing their coating are wearing out</li>
                <li><strong>Moss or green stuff:</strong> Heavy growth can trap water</li>
              </ul>
              <h4>What to Look For Inside</h4>
              <p>
                Sometimes you see problems inside first:
              </p>
              <ul>
                <li><strong>Brown spots on ceilings:</strong> Water is getting in</li>
                <li><strong>Light in your attic:</strong> If you see daylight through the roof, that is bad</li>
                <li><strong>Sagging areas:</strong> Dips in your roof are a warning sign</li>
                <li><strong>High energy bills:</strong> A bad roof lets heat escape</li>
                <li><strong>Mold smell:</strong> Especially in the attic, this means water problems</li>
              </ul>
              <h4>After Storms</h4>
              <p>
                Always check your roof after big storms. Hail can hurt shingles. Wind can pull them off. Branches can cause damage you can see. Tell your insurance company fast. Most have a time limit for claims.
              </p>
            </ExpandableSection>

            <ExpandableSection title="How to Get a Free Roof Estimate Online">
              <p>
                Getting a free estimate online is easy. You can get a price without anyone coming to your house. Here is how our tool works:
              </p>
              <h4>Step 1: Type Your Address</h4>
              <p>
                Put your home address in our search box. We use Google to find your property. You do not need an account. You do not need a credit card.
              </p>
              <h4>Step 2: We Measure Your Roof</h4>
              <p>
                Our smart tools look at satellite photos of your home. We figure out:
              </p>
              <ul>
                <li>How big your roof is</li>
                <li>How steep it is</li>
                <li>How complex the shape is</li>
                <li>How many sections it has</li>
              </ul>
              <p>
                Insurance companies use the same kind of satellite tools. Our measurements are 90-95% accurate for most homes.
              </p>
              <h4>Step 3: Get Your Price</h4>
              <p>
                In about 60 seconds, you see:
              </p>
              <ul>
                <li>Low, middle, and high prices</li>
                <li>Your roof size in square feet</li>
                <li>What different materials cost</li>
                <li>Prices for your area</li>
              </ul>
              <h4>Step 4: Talk to a Roofer (If You Want)</h4>
              <p>
                After you get your estimate, you can talk to a roofer near you. They can answer questions and come look at your roof in person. You do not have to say yes to anything.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Should You Repair or Replace Your Roof?">
              <p>
                Not every roof problem needs a whole new roof. Sometimes a repair is enough. Here is how to decide:
              </p>
              <h4>When to Repair</h4>
              <p>
                A repair is a good choice when:
              </p>
              <ul>
                <li><strong>Small damage area:</strong> Just a few shingles are missing or hurt</li>
                <li><strong>Roof is under 15 years old:</strong> It still has many good years left</li>
                <li><strong>Less than 30% needs work:</strong> Most of the roof is fine</li>
                <li><strong>No big problems:</strong> The wood under the shingles is solid</li>
                <li><strong>Repair costs less than half a new roof:</strong> If it costs more, a new roof makes sense</li>
              </ul>
              <h4>When to Replace</h4>
              <p>
                A new roof is better when:
              </p>
              <ul>
                <li><strong>Roof is over 20 years old:</strong> It is near the end of its life</li>
                <li><strong>Damage is everywhere:</strong> Many spots are worn or hurt</li>
                <li><strong>Leaks keep coming back:</strong> Patches are not fixing the problem</li>
                <li><strong>Wood is rotting:</strong> The structure has problems</li>
                <li><strong>You are selling your home:</strong> A new roof helps sell faster</li>
                <li><strong>Insurance says so:</strong> Some companies need new roofs after a certain age</li>
              </ul>
              <h4>Think About the Long Run</h4>
              <p>
                Here is an example. Your 18-year-old roof needs $4,000 in repairs. A new roof costs $12,000. The repair seems cheaper. But your roof only has 5-7 years left anyway.
              </p>
              <p>
                If you repair now, you still need a new roof soon. The $12,000 roof gives you 25-30 years of protection. Often, the new roof is the better deal over time.
              </p>
            </ExpandableSection>

            <ExpandableSection title="How to Pick a Good Roofer">
              <p>
                Picking the right roofer matters a lot. Even great shingles fail if put on wrong. Here is how to find someone good:
              </p>
              <h4>Check License and Insurance</h4>
              <p>
                Every good roofer should have:
              </p>
              <ul>
                <li><strong>State license:</strong> This proves they meet basic standards</li>
                <li><strong>Liability insurance:</strong> Pays if they damage your property</li>
                <li><strong>Workers compensation:</strong> Covers hurt workers. Without it, you could get in trouble</li>
                <li><strong>Bond (if your state needs it):</strong> Protects you if they do not finish</li>
              </ul>
              <p>
                Ask for insurance papers. Call the insurance company to make sure they are real.
              </p>
              <h4>Read Reviews</h4>
              <p>
                Look up the roofer online:
              </p>
              <ul>
                <li>Read Google, Yelp, and BBB reviews</li>
                <li>Ask for names of past customers you can call</li>
                <li>Check for complaints at your state's license board</li>
                <li>Look for special training from companies like GAF, Owens Corning, or CertainTeed</li>
              </ul>
              <h4>Get Everything in Writing</h4>
              <p>
                A good estimate should list:
              </p>
              <ul>
                <li>Exactly what work they will do</li>
                <li>What materials they will use (brand, type, color)</li>
                <li>When they will finish</li>
                <li>The total price with no hidden fees</li>
                <li>When to pay (never pay all upfront)</li>
                <li>What promises they make about the work</li>
                <li>Who gets the permits</li>
              </ul>
              <h4>Warning Signs</h4>
              <p>
                Stay away from roofers who:
              </p>
              <ul>
                <li>Want all the money upfront</li>
                <li>Only take cash</li>
                <li>Push you to decide right now</li>
                <li>Have no real office address</li>
                <li>Quote prices way lower than everyone else</li>
                <li>Will not show license or insurance papers</li>
                <li>Want to use leftover materials from other jobs</li>
              </ul>
            </ExpandableSection>

            <ExpandableSection title="Roof Warranties Explained">
              <p>
                Warranties protect your money. But they can be confusing. Here is what you need to know:
              </p>
              <h4>Material Warranty</h4>
              <p>
                This covers problems with the shingles themselves. Most companies offer:
              </p>
              <ul>
                <li><strong>Basic warranty:</strong> 20-30 years. Covers factory defects only.</li>
                <li><strong>Better warranty:</strong> 40-50 years. Covers defects plus wind and algae.</li>
                <li><strong>Best warranty:</strong> Lifetime. Higher wind protection. Can transfer to new owners.</li>
              </ul>
              <p>
                Note: "Lifetime" means the life of the shingles, not your life. Coverage often goes down over time.
              </p>
              <h4>Work Warranty</h4>
              <p>
                This covers mistakes the roofer makes. A roof can fail even with good shingles if put on wrong. Look for:
              </p>
              <ul>
                <li><strong>1-2 years:</strong> Too short. Try to find better.</li>
                <li><strong>5-10 years:</strong> Good. Look for at least this much.</li>
                <li><strong>15-25 years:</strong> Great. Top roofers offer this.</li>
              </ul>
              <h4>Special Warranties</h4>
              <p>
                When certified roofers use certain brands, you can get extra protection:
              </p>
              <ul>
                <li>Longer coverage backed by the company</li>
                <li>Covers the whole roof system, not just shingles</li>
                <li>Full coverage that does not go down over time</li>
                <li>Can transfer to new owners if you sell</li>
              </ul>
              <p>
                Examples: GAF Golden Pledge, Owens Corning Platinum Protection, CertainTeed SureStart PLUS.
              </p>
              <h4>What Breaks a Warranty</h4>
              <p>
                These things can void your warranty:
              </p>
              <ul>
                <li>Roof put on wrong</li>
                <li>Not enough air flow in your attic</li>
                <li>Pressure washing your roof</li>
                <li>Walking on the roof too much</li>
                <li>Putting up satellite dishes or solar panels the wrong way</li>
                <li>Not cleaning gutters and removing leaves</li>
              </ul>
            </ExpandableSection>

            <ExpandableSection title="Ways to Pay for a New Roof">
              <p>
                A new roof costs a lot. But there are many ways to pay. Here are your options:
              </p>
              <h4>Insurance Claims</h4>
              <p>
                If a storm damaged your roof, insurance may pay. You pay your deductible ($500-$2,500 for most people). Insurance pays the rest. Take photos of damage. File your claim fast.
              </p>
              <h4>Home Equity Loans</h4>
              <p>
                These loans use your home as backup. They often have lower rates (usually 5-10%). The interest might be tax deductible. Ask a tax advisor. You can pay back over many years.
              </p>
              <h4>Personal Loans</h4>
              <p>
                These loans do not need home equity. You get approved faster. Rates are usually 6-20% based on your credit score. Online lenders often have good rates.
              </p>
              <h4>Roofer Payment Plans</h4>
              <p>
                Many roofers work with loan companies. Some have 0% interest for 12-18 months. Read all the fine print. Know what happens if you do not pay it off in time.
              </p>
              <h4>Credit Cards</h4>
              <p>
                Cards work for smaller jobs or deposits. Some cards have 0% interest for a while. This is like free borrowing if you pay before the deal ends. But regular card rates are high. Be careful with big amounts.
              </p>
              <h4>FHA Title 1 Loans</h4>
              <p>
                The government backs these loans for home fixes. You do not need much home equity. Rates are fair. This is good if you do not have a lot of equity built up.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Best Time to Replace Your Roof">
              <p>
                When you replace your roof can change the cost and quality. Here is what to know:
              </p>
              <h4>Spring (March-May)</h4>
              <p>
                Good temperatures for roofing. Roofers are getting ready for busy season. You beat the summer rush. But spring storms can cause delays.
              </p>
              <h4>Summer (June-August)</h4>
              <p>
                Busiest time for roofers. Prices may be higher. Very hot days make shingles too soft. Workers struggle in heat. Try to book early in summer.
              </p>
              <h4>Fall (September-November)</h4>
              <p>
                Many people think fall is the best time. Nice temperatures. Less humidity. You get a new roof before winter. Book early because everyone wants fall.
              </p>
              <h4>Winter (December-February)</h4>
              <p>
                You might get lower prices. But cold weather causes problems. Shingles do not seal well in cold. Weather delays are more common. Best only for mild climates or emergencies.
              </p>
              <h4>Temperature Matters</h4>
              <p>
                Shingles work best between 45°F and 85°F. Below 40°F, shingles can crack. They will not seal until it warms up. Very hot days make shingles too soft. Workers also face safety risks in heat.
              </p>
              <h4>Plan Ahead</h4>
              <p>
                Do not wait until your roof is leaking. The best time to get an estimate is before you have problems. Get your free estimate now. Plan and budget before trouble starts.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Comparing Roof Materials">
              <p>
                Picking the right material means thinking about cost, how long it lasts, how it looks, and your weather. Here is a guide:
              </p>
              <h4>Asphalt Shingles</h4>
              <p>
                <strong>Cost:</strong> $3-$7 per sq ft<br />
                <strong>Lasts:</strong> 15-30 years<br />
                <strong>Best for:</strong> Most homeowners, most weather
              </p>
              <p>
                Most popular choice in America. Good value for the price. Comes in many colors. Works in most places. Pick nicer shingles over basic ones. They last longer and look better.
              </p>
              <h4>Metal Roofing</h4>
              <p>
                <strong>Cost:</strong> $8-$16 per sq ft<br />
                <strong>Lasts:</strong> 40-70 years<br />
                <strong>Best for:</strong> People staying long-term, tough weather, saving energy
              </p>
              <p>
                Getting more popular. Lasts a very long time. Reflects sun heat so you save on cooling. Costs more upfront but can save money over many years.
              </p>
              <h4>Tile Roofing</h4>
              <p>
                <strong>Cost:</strong> $10-$20 per sq ft<br />
                <strong>Lasts:</strong> 50-100 years<br />
                <strong>Best for:</strong> Hot, dry places, Spanish-style homes
              </p>
              <p>
                Clay and concrete tiles last forever. They are heavy. Your roof needs to be strong enough. Great at stopping fire. Does well in hot sun. Popular in Southwest, Florida, and California.
              </p>
              <h4>Slate Roofing</h4>
              <p>
                <strong>Cost:</strong> $15-$30 per sq ft<br />
                <strong>Lasts:</strong> 75-150+ years<br />
                <strong>Best for:</strong> Old homes, fancy houses, families passing homes down
              </p>
              <p>
                Real stone. Can last over 100 years. Very heavy. Needs a strong roof. Hard to fix. Needs special workers. Costs the most upfront. But the cost per year can be lower than other roofs over time.
              </p>
              <h4>Wood Shakes</h4>
              <p>
                <strong>Cost:</strong> $8-$14 per sq ft<br />
                <strong>Lasts:</strong> 20-40 years<br />
                <strong>Best for:</strong> Rustic look, mild weather
              </p>
              <p>
                Cedar shakes look beautiful. They insulate well. But they need more care. They are not fireproof unless treated. Do not work well in wet places. Some towns do not allow them.
              </p>
            </ExpandableSection>

            <ExpandableSection title="What Is in a Roof Estimate?">
              <p>
                A good estimate tells you everything. Here is what to look for:
              </p>
              <h4>Material Costs</h4>
              <p>
                The estimate should list:
              </p>
              <ul>
                <li><strong>Shingles:</strong> Brand, type, color, how many</li>
                <li><strong>Under layer:</strong> The protective sheet under shingles</li>
                <li><strong>Water shield:</strong> Extra protection in valleys and edges</li>
                <li><strong>Metal pieces:</strong> Around chimney, vents, and edges</li>
                <li><strong>Special shingles:</strong> For edges and peaks</li>
                <li><strong>Vents:</strong> To let air flow through your attic</li>
                <li><strong>Nails:</strong> What kind and how many</li>
              </ul>
              <h4>Labor Costs</h4>
              <p>
                Workers usually cost 40-60% of your total. What changes labor costs:
              </p>
              <ul>
                <li>How steep your roof is</li>
                <li>How many stories your house has</li>
                <li>How easy it is to reach</li>
                <li>What workers charge in your area</li>
                <li>If they need to tear off old roofing</li>
              </ul>
              <h4>Removal and Trash</h4>
              <p>
                Taking off old shingles adds $1-$3 per square foot. This includes:
              </p>
              <ul>
                <li>Removing old shingles and under layer</li>
                <li>Checking and fixing wood underneath</li>
                <li>Renting a big trash bin</li>
                <li>Paying to dump the old stuff</li>
              </ul>
              <h4>Permits</h4>
              <p>
                Most places need a permit for roof work. Permits cost $100-$500. Your roofer should get the permit as part of the job.
              </p>
              <h4>Warranties</h4>
              <p>
                The estimate should say what promises you get. Better warranties might cost a bit more but protect you.
              </p>
            </ExpandableSection>

            <ExpandableSection title="Getting Ready for Roof Work">
              <p>
                Once you pick a roofer and set a date, prepare your home. This helps the job go smoothly:
              </p>
              <h4>Before Workers Arrive</h4>
              <ul>
                <li><strong>Move cars:</strong> Park away from the house. Stuff might fall.</li>
                <li><strong>Clear around your house:</strong> Move patio furniture, grills, plants, decorations</li>
                <li><strong>Cover plants:</strong> Put tarps over bushes near the house</li>
                <li><strong>Take things off walls:</strong> Pounding can knock pictures down</li>
                <li><strong>Check your attic:</strong> Secure loose items. Dust will fall through</li>
                <li><strong>Tell neighbors:</strong> Let them know it will be noisy</li>
                <li><strong>Plan for pets:</strong> Keep them inside or away from work</li>
                <li><strong>Plan for kids:</strong> Roofing is loud all day</li>
              </ul>
              <h4>During the Work</h4>
              <ul>
                <li>Expect loud noise all day</li>
                <li>Workers need power and maybe water</li>
                <li>You will feel vibrations in the house</li>
                <li>Work may start early and end late</li>
                <li>A big trash bin will be in your yard</li>
              </ul>
              <h4>After the Work</h4>
              <ul>
                <li><strong>Look around with the roofer:</strong> Check the finished work</li>
                <li><strong>Find stray nails:</strong> Run a magnet over your lawn</li>
                <li><strong>Take photos:</strong> Document the completed roof</li>
                <li><strong>Keep papers safe:</strong> Save all warranty documents</li>
                <li><strong>Pay last part:</strong> Only pay the rest after you are happy with the work</li>
              </ul>
            </ExpandableSection>
          </div>

          {/* Final CTA */}
          <div className="mt-12 text-center bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready for Your Free Roof Estimate?</h3>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Now you know about roof costs and what to expect. Get your free estimate. It takes 60 seconds. It helps you plan your roof project.
            </p>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-white text-emerald-600 font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              Get My Free Estimate Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
