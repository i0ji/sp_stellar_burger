<h1>First sprint</h1>
<h3>16.01-28.01</h3>
<b>b</b>:main <b>v:</b>0.0.1<br>
yarn/vite/react-ts/sass/git empty proj init;

20.01.24:
<b>b:</b>step-1/0.0.1:
alias/components added;<br>
21.01.24:
base markup/button effects;<br>
28.01.24:
All main functions are set:
API request, modals, tab scroll to ingredient groups;<br>
29.01.24:
Pull request accepted by reviewer;
Following the checklist and technical specifications of the first sprint:<br>

- The main layout and markup is done;
- Two modals are ready; One with static data and another with data got from API;
- API request separated in separate .ts file and have a failure check on loading;
- Multiple SCSS, logic and markup settings were refactored while adding new features;<br>

<h1>Second sprint</h1>
<h3>29.01-11.02</h3>
<b>b:</b>sprint2/step-1
<b>v:</b> 0.1.6.*<br>

Style and code edits:

- Removed some incorrect markup;
- Alignment of design elements;
- Header tag changed to semantically – correct "header";
- added custom hook to manage orderModal state and orderID request;
- Added "utils" and "services" folders for storing requests and context, respectively;
- Added checkResponse function to simplify the code;
- Changed ID binding from array position to native \_id property of the mapped object;

  04.02.24: **b**:sprint2/step-2/**v**:0.1.6: Reviewer accepted changes; started Redux/DND tasks;<br>
  06.02.24: **b**:sprint2/step-2/**v**:0.1.6: Small CSS edits, preparing the proj to Redux, yarn and package.json
  updated;<br>
  07.02.24 **b**:sprint2/step-2/**v**: 0.1.6.4: DND lib added, some OrderDetails type issues fixed;<br>
  08.02.24 **b**:sprint2/step-2/**v**: 0.1.6.4: Fetch function wrote and set via RTK; Base slice and store logic set;<br>
  09.02.24 **b**:sprint2/step-2/**v**: 0.1.6.4: Rollback and refactoring; First global state(ingredientsList) set;<br>
  10.02.24 **b**:sprint2/step-2/**v**: 0.1.6.5: Second state, totalAmount func, adding/removing elements logic set;<br>
  11.02.24 **b**:sprint2/step-2/**v**: 0.1.6.6: Reorder logic, some markup changes to display content correctly; <b>MERGE
  REQUEST sent</b>;<br>
  12.02.24 **b**:sprint2/step-2/**v**: 0.1.6.6: Working on the list of improvements; bun counter; URL routs;<br>
  13.02.24 **b**:sprint2/step-2/**v**: 0.1.6.7: UI changes; scroll implementation via IOA; order number logic; <b>MERGE
  REQUEST sent</b>;<br>
  14.02.24 **b**:sprint2/step-2/**v**: 0.1.6.7.1: Added checkResponse method to my orderNumber request;
  **\_\_\_** **b**:sprint2/step-2/**v**: 0.1.7.1: Fixing type issues; edits based on reviewers' comments; added preloader and
  a error message common components wrapped by modalOverlay and set it logic;<br>
  15.02.24: **b**:sprint2/step-2/**v**:0.1.7.2: general settings and code maintenance;
  16.02.24: **b**:sprint2/step-2/**v**:0.1.7.2: initial top/bottom bun refactored;

<h1>Third sprint</h1>
<h3>16.02-06.03</h3>
<b>b:</b>sprint3/step-1 <b>v: </b> 0.1.7.*
<br>

Global project features:

- React-router added;
- Multiply small edits of style, small features, objects displaying;
- Refactored Ingredients-modal separate window with its own routing;
- Added auth and user check states;
- Added certain slice for auth and actions with user data;
- Register/logout/login/refresh/reset and forgot password functions added;

  19.02.24: **b**:sprint3/step-1/**v**:0.1.8.0: React-router added, routing logic started, minor style changes;<br>
  20.02.24: **b**:sprint2/step-2/**v**:0.1.8.0.1: refactor router folders, style edits;<br>
  21.02.24: **b**:sprint2/step-2/**v**:0.1.8.0.2: styling NavLinks and modal routing;<br>
  22.02.24: **b**:sprint2/step-2/**v**:0.1.8.2: setting ingredients modal, style changes, styling NavLinks;<br>
  23.02.24: **b**:sprint2/step-2/**v**:0.1.8.0.3: refactoring modal and ingredients pages;<br>
  24.02.24: **b**:sprint2/step-2/**v**:0.1.8.0.3: attempts of animating enter and exit components;<br>
  25.02.24: **b**:sprint2/step-2/**v**:0.1.8.1: reset/register/get tokens utils, loading page refactor;<br>
  26.02.24: **b**:sprint2/step-2/**v**:0.1.8.2: get two tokens;auth logic;custom hook for forms, start ProtectedRoute;<br>
  27.02.24: **b**:sprint2/step-2/**v**:0.1.8.3: feature: auth, protected, statement, login and logout logic, useForm;<br>
  28.02.24: **b**:sprint2/step-2/**v**:0.1.8.4: feature: setAuthCheck rework; routing rework, types declaration,
  handleRegister; ProtectedRoute logic;<br>
  01.03.24 **b**:sprint2/step-2/**v**:0.1.8.5.1: Register checked;<br>
  02.03.24 **b**:sprint2/step-2/**v**:0.1.8.5.1: feature:added wight route from login to '/' after enter, feature:added
  password hide/show logic, in progress: auth/login/logout/reset logic<br>
  03.03.24 **b**:sprint2/step-2/**v**:0.1.8.5.1: Register checked;<br>
  04.03.24 **b**:sprint2/step-2/**v**:0.1.8.5.1: global: yarn updated, fix: logic and display of the component of
  Profile;<br>
  fix: "save/cancel" buttons
  style: appearance of icons on editing
  chore: some minor edits in api.ts

<h1>Fourth sprint</h1>
<h3>07.03-14.03</h3>
<b>b:</b>sprint4/step-1 <b>v: </b> 0.1.9.*
<br>

Global project features:

- Mass typing of components, utils, functions;
- Remove order request from useModal hook;

  07.03.24: **b**:sprint4/step-1/**v**:0.1.9.3: multiply typing nad fixing type issues; replace interfaces, types and vars
  to separate folder; some API logic refactor;<br>
  08.03.24: **b**:sprint4/step-1/**v**:0.1.9.3.1: profile page animation edition; typing;<br>
  11.03.24: **b**:sprint4/step-1/**v**:0.1.9.3.1: prevent order logic; refactor prevent order logic; typing DND; typing
  currentSlice;<br>
  12.03.24: **b**:sprint4/step-1/**v**:0.1.9.3.2: api.ts and App.tsx type;<br>
  13.03.24: **b**:sprint4/step-1/**v**:0.1.9.3: README small edit; typing; replace order logic from hook to constructor
  component;<br>

<h1>Fifth sprint</h1>
<h3>17.03-31.03</h3>
<b>b:</b>sprint5/step-1 <b>v: </b> 0.1.9.*
<br>

Global project features:

- Add WS connection;
- Pages for personal and common orders;
- Middleware set with tokenRefresh function and token access to personal orders;
- Start react-framer;

  17.03.24: **b**:sprint5/step-1/**v**:0.1.9.5: order button leads to login when unAuth; add style bun highlights; make
  order condition and highlight problem logic;<br>
  18.03.24: **b**:sprint5/step-1/**v**:0.1.9.5.1: typing; RootState typing; interfaces optimising; LoginPage function take
  out from memoise; changed the file structure - corresponding files moved to services; IForm small edit; custom hook file
  and typing;<br>
  19.03.24: **b**:sprint5/step-1/**v**:0.1.9.5.3: typing; multiply type and interface changes; added navigation to '/'
  after logout; chore; style edits;<br>
  20.03.24: **b**:sprint5/step-1/**v**:0.1.9.5.3: style edits;
  22.03.24: **b**:sprint5/step-1/**v**:0.1.9.5.5: style and type small edits; small constructor layout edits; added typed
  useSelector and useDispatch;<br>
  23.03.24: **b**:sprint5/step-1/**v**:0.1.9.5.5: style: add container markup mixin; multiply small edits; markup feed
  page; markup feed page; attempt to separate auxiliary functions into a separate file; multiply markup attempts;
  chore; <br>
  24.03.24: **b**:sprint5/step-1/**v**:0.1.9.5.6: feed markup; multiply edits; replace <Modal> wrapper from App into
  Ingredients detail component; styling thumbnails; multiply style edits; Thumbnail props type;<br>
  25.03.24: **b**:sprint5/step-1/**v**:0.1.9.6.1: cascade attempts; thumbnails set; history markup; new routing setting;
  small style edits;<br>
  26.03.24: **b**:sprint5/step-1/**v**:0.1.9.6.3: yarn up; profile/feed set; markup profile orders page; take Profile to
  separate folder; multiply style edits; added \_size for measurement vars; markup profile orders; some types
  refactor;minor style and code improvements; placement of variables;<br>
  27.03.24: **b**:sprint5/step-1/**v**:0.1.9.6.4: attempt to avoid unnecessary rerender; added; writing and typing store, reducers and actions for WS; get rid of unnecessary feed store and put all logic in global store; get WS response - message; get array of orders; <br>
  28.03.24: **b**:sprint5/step-1/**v**:0.1.9.6.5: Feed markup update; get total and totalToday numbers; main feed display; some minor edits; typings; order price set; order routing in progress; get modal out of nested components to make right implementation;<br>
  29.03.24: **b**:sprint5/step-1/**v**:0.1.9.6.5: total refactor using middleware;<br>
  30.03.24: **b**:sprint5/step-1/**v**:0.1.9.6.6: add ban type disabling from ESlnit; add wsActions and second middleware; get ingredients via new middleware; types, actionsTypes, add second reducer/action pair; correct data set; profile order list w/o personal filter yet;<br>
  31.03.24: **b**:sprint5/step-1/**v**:0.1.9.6.6: delete store unused action types; routing attempts; move some common style settings to @mixin; personal orders check; routing;<br>
  01.03.24: **b**:sprint5/step-1/**v**:0.1.9.6.7: store typed issue; add react-framer to implement smooth render; routing;
  02.03.24: **b**:sprint5/step-1/**v**:0.1.9.6.8: add order request; routing; add direct flag to OrderDetails; route markup; common order direct and nested route set; styling modal window for best behavior;<br>
  03.03.24: **b**:sprint5/step-1/**v**:0.1.9.6.7.: reset to prev.version; profile page and orders layout refactor; routing for profile and feed pages; multiply style improvements and changes;
  04.03.24: **b**:sprint5/step-1/**v**:0.1.9.6.7.3: remove isDirect flag, replace it with IF condition when render OrderDetails; add \_id mapping key instead of i:number in ingredients; render of OrderDetails; add error reset on successful orderSlice update; modal shadow overlaps header; add description to Loader; updated and corrected calculation of order amount and quantity of ingredients; fixing last img brightness; some minor style and markup edits; add conditional render; move calculating qty and price logic to separate file; some markup edits for better reading; replace orderData condition; framer option start;<br>
  08.09.25: **b**:chore **v**:0.1.9.6.7.3: deps, docs update;<br>
  08.09.25: **b**:chore **v**:0.1.9: deps update;<br>
  10.12.25: **b**:chore **v**:0.2.0: total interfaces & types refactor and fixing type issues in slices, reducers etc;
