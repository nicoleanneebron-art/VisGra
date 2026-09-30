const APP_VERSION = '8';
const modules = [
  {title:'Foundations & Primitives', short:'Shapes, coordinates, GLUT basics', desc:'Start with the building blocks: windows, primitive modes, vertices, and the OpenGL coordinate system.', color:'mint', challenges:[
    ['Clear the framebuffer','Which OpenGL function clears the framebuffer?','Easy',['glClearColor(0.1f, 0.1f, 0.35f, 1.0f);','gl__________(GL_COLOR_BUFFER_BIT);','glFlush();'],'Clear'],
    ['A single point','Which primitive mode turns each vertex into a dot?','Easy',['glBegin(__________);','glVertex2f(0.0f, 0.0f);','glEnd();'],'GL_POINTS'],
    ['Triangle outline','Close the triangle automatically with the correct primitive.','Easy',['glBegin(__________);','glVertex2f(0.0f, 0.6f);','glVertex2f(-0.6f, -0.4f);','glVertex2f(0.6f, -0.4f);','glEnd();'],'GL_LINE_LOOP'],
    ['The display callback','Where does GLUT send the scene-drawing function?','Medium',['glutDisplayFunc(__________);','glutMainLoop();'],'display'],
    ['Origin point','Place a point at the center of the default coordinate system.','Medium',['glBegin(GL_POINTS);','glVertex2f(__________, __________);','glEnd();'],'0.0f, 0.0f']
  ]},
  {title:'Color & Raster State', short:'Color, interpolation, blending, stipple', desc:'Practice the state changes that shape how primitives become colored pixels.', challenges:[
    ['Color a primitive','Set the current color before drawing the triangle.','Easy',['glColor3f(__________, __________, __________);','glBegin(GL_TRIANGLES);','glEnd();'],'1.0f, 0.0f, 0.0f'],
    ['Smooth shading','Enable color interpolation across vertices.','Medium',['glShadeModel(__________);','glBegin(GL_TRIANGLES);','glEnd();'],'GL_SMOOTH'],
    ['Alpha blending','Turn on the blend pipeline for transparent quads.','Medium',['glEnable(__________);','glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);'],'GL_BLEND'],
    ['Dashed line','Use the manual’s classic dash pattern.','Medium',['glEnable(GL_LINE_STIPPLE);','glLineStipple(1, __________);','glBegin(GL_LINES);'],'0x00FF'],
    ['Disable the state','Cleanly turn stippling off after the line.','Easy',['glEnd();','glDisable(__________);'],'GL_LINE_STIPPLE']
  ]},
  {title:'Text, Input & Motion', short:'Fonts, keyboard, mouse, timers', desc:'Make a scene respond: render text, listen for input, and animate with GLUT callbacks.', challenges:[
    ['Bitmap text','Choose the GLUT call that draws one bitmap character.','Easy',['glRasterPos2f(-0.8f, 0.7f);','glutBitmapCharacter(GLUT_BITMAP_8_BY_13, __________);'],'ch'],
    ['Keyboard callback','Register the function that reacts to key presses.','Easy',['glutKeyboardFunc(__________);','glutMainLoop();'],'keyboard'],
    ['Refresh the frame','Ask GLUT to draw again after a state change.','Medium',['positionX += 0.1f;','glut__________();'],'PostRedisplay'],
    ['Mouse button input','Register the callback for button clicks.','Medium',['glut__________(mouse);','glutDisplayFunc(display);'],'MouseFunc'],
    ['Timer movement','Schedule a callback after a delay.','Hard',['glut__________(1000, moveShape, 0);','glutPostRedisplay();'],'TimerFunc']
  ]},
  {title:'Arrays & Indexed Rendering', short:'Vertex arrays, colors, draw calls', desc:'Move beyond immediate mode with reusable data, color arrays, indices, and efficient draw calls.', challenges:[
    ['Vertex array data','Tell OpenGL where the vertex data lives.','Easy',['glEnableClientState(__________);','glVertexPointer(2, GL_FLOAT, 0, vertices);'],'GL_VERTEX_ARRAY'],
    ['Draw the array','Render three vertices from the currently bound array.','Easy',['glDrawArrays(GL_TRIANGLES, 0, __________);'],'3'],
    ['Color array','Enable the second client-side array for colors.','Medium',['glEnableClientState(__________);','glColorPointer(3, GL_FLOAT, 0, colors);'],'GL_COLOR_ARRAY'],
    ['Indexed rendering','Use the index buffer for a triangle.','Medium',['glDrawElements(GL_TRIANGLES, 3, GL_UNSIGNED_INT, __________);'],'indices'],
    ['Reuse a center vertex','Pick the call that draws a fan from indexed data.','Hard',['glDrawElements(GL_TRIANGLE_FAN, count, GL_UNSIGNED_INT, __________);'],'indices']
  ]},
  {title:'Mixed Mastery', short:'Full-program boss challenges', desc:'Combine primitives, raster state, input, animation, and arrays in complete programs with multiple missing pieces.', color:'lime', challenges:[
    ['Point scene','Complete the full GLUT point-scene setup.','Hard',['#include <GL/__________>','void __________() {','  glClear(GL__________);','  glColor3f(__________, 1.0f, 1.0f);','  glBegin(__________);','  glVertex2f(0.0f, __________);','  glEnd();','  glFlush();','}'],['glut.h','display','COLOR_BUFFER_BIT','0.0f','GL_POINTS','0.0f']],
    ['Animated triangle','Wire the display callback, timer, and animated vertex together.','Hard',['float angle = __________;','void __________(int value) {','  angle += __________;','  glutPost__________();','  glutTimerFunc(__________, animate, 0);'],['0.0f','animate','0.05f','Redisplay','16']],
    ['Blended quads','Finish a transparent two-quad scene with the correct state calls.','Hard',['void display() {','  glClear(GL__________);','  glEnable(GL__________);','  glBlendFunc(GL__________, GL_ONE_MINUS_SRC_ALPHA);','  glColor4f(1.0f, 0.0f, 0.0f, __________);','  glBegin(GL__________);','  glEnd();','  glDisable(GL__________);','}'],['COLOR_BUFFER_BIT','BLEND','SRC_ALPHA','0.5f','QUADS','BLEND']],
    ['Keyboard-controlled square','Complete the callback and redraw path for a movable square.','Hard',['float positionX = __________;','void __________(unsigned char key, int x, int y) {','  if (key == \'d\') positionX += __________;','  glutPost__________();','}','int main(int argc, char** argv) {','  glutKeyboardFunc(__________);','  glutDisplayFunc(__________);','}'],['0.0f','keyboard','0.1f','Redisplay','keyboard','display']],
    ['Gradient triangle','Fill in the state, primitive, and three vertex colors.','Hard',['void display() {','  glShadeModel(__________);','  glBegin(__________);','  glColor3f(__________, 0.0f, 0.0f);','  glVertex2f(0.0f, 0.6f);','  glColor3f(0.0f, __________, 0.0f);','  glVertex2f(-0.6f, -0.4f);','  glColor3f(0.0f, 0.0f, __________);','  glVertex2f(0.6f, -0.4f);','  glEnd();','}'],['GL_SMOOTH','GL_TRIANGLES','1.0f','1.0f','1.0f']],
    ['Vertex-array triangle','Complete an efficient array-based triangle draw.','Hard',['GLfloat vertices[] = { -0.5f, -0.5f, 0.5f, -0.5f, 0.0f, 0.5f };','glEnableClientState(__________);','glVertexPointer(__________, GL_FLOAT, __________, vertices);','glDrawArrays(__________, 0, __________);','glDisableClientState(GL_VERTEX_ARRAY);'],['GL_VERTEX_ARRAY','2','0','GL_TRIANGLES','3']],
    ['Indexed colored quad','Connect both vertex and color arrays to one indexed draw.','Hard',['glEnableClientState(GL__________);','glEnableClientState(GL__________);','glVertexPointer(2, GL_FLOAT, 0, __________);','glColorPointer(3, GL_FLOAT, 0, __________);','glDrawElements(GL__________, 6, GL_UNSIGNED_INT, __________);','glDisableClientState(GL_COLOR_ARRAY);','glDisableClientState(GL_VERTEX_ARRAY);'],['VERTEX_ARRAY','COLOR_ARRAY','vertices','colors','TRIANGLES','indices']],
    ['Text and mouse scene','Complete a scene that labels a click and refreshes the frame.','Hard',['void __________(int button, int state, int x, int y) {','  if (state == GLUT__________) {','    glutPost__________();','  }','}','int main() {','  glutMouseFunc(__________);','  glutDisplayFunc(__________);','}'],['mouse','DOWN','Redisplay','mouse','display']]
  ]}
];

// The manuals contain 20 guided examples per module. These short review prompts
// mirror that progression while keeping each blank focused on one concept.
modules[0].challenges.push(
  ['Line primitive','Draw one independent line segment.','Easy',['glBegin(__________);','glVertex2f(-0.7f, -0.5f);','glVertex2f(0.7f, 0.5f);','glEnd();'],'GL_LINES'],
  ['Open line chain','Connect vertices without closing the shape.','Easy',['glBegin(__________);','glVertex2f(-0.8f, -0.4f);','glVertex2f(0.0f, 0.4f);','glVertex2f(0.8f, -0.4f);','glEnd();'],'GL_LINE_STRIP'],
  ['Filled triangle','Choose the primitive that fills three vertices.','Easy',['glBegin(__________);','glVertex2f(0.0f, 0.6f);','glVertex2f(-0.6f, -0.4f);','glVertex2f(0.6f, -0.4f);','glEnd();'],'GL_TRIANGLES'],
  ['Filled polygon','Fill an ordered list of four vertices.','Easy',['glBegin(__________);','glVertex2f(-0.5f, -0.5f);','glVertex2f(-0.5f, 0.5f);','glVertex2f(0.5f, 0.5f);','glVertex2f(0.5f, -0.5f);','glEnd();'],'GL_POLYGON'],
  ['Point size','Make a point large enough to see.','Medium',['gl__________(10.0f);','glBegin(GL_POINTS);','glVertex2f(0.0f, 0.0f);'],'PointSize'],
  ['Line width','Control the thickness of a line.','Medium',['gl__________(3.0f);','glBegin(GL_LINES);','glEnd();'],'LineWidth'],
  ['Window size','Set the window dimensions before creating it.','Easy',['glut__________(600, 600);','glutCreateWindow("Shapes");'],'InitWindowSize'],
  ['Window position','Place a window near the top-left.','Medium',['glut__________(50, 50);','glutInitWindowSize(600, 600);'],'InitWindowPosition'],
  ['Flush drawing','Send all pending commands to the display.','Easy',['glEnd();','gl__________();'],'Flush'],
  ['Coordinate range','The default visible range on each axis is -1 to ____.','Easy',['float rightEdge = __________;','float topEdge = 1.0f;'],'1.0f'],
  ['Axes line','Start drawing an axis from the left edge.','Medium',['glBegin(GL_LINES);','glVertex2f(__________, 0.0f);','glVertex2f(1.0f, 0.0f);'],'-1.0f'],
  ['Regular polygon math','Use the circle radius with this math function.','Hard',['float x = radius * __________(angle);','float y = radius * sinf(angle);'],'cosf'],
  ['Nested point grid','Increment the coordinate in a loop.','Medium',['for (float x = -0.8f; x <= 0.8f; x += __________) {','glVertex2f(x, 0.0f);','}'],'0.2f'],
  ['Multiple shapes','Finish one primitive block before starting another.','Easy',['glBegin(GL_TRIANGLES);','glEnd();','glBegin(__________);','glEnd();'],'GL_POLYGON']
);
modules[1].challenges.push(
  ['Red current color','Use a red RGB float triplet.','Easy',['glColor3f(__________, 0.0f, 0.0f);'],'1.0f'],
  ['Integer colors','Use the 0-255 color API for orange.','Easy',['glColor3ub(255, __________, 0);'],'140'],
  ['Blue square','Set the current color to blue.','Easy',['glColor3f(0.0f, 0.0f, __________);','glBegin(GL_POLYGON);'],'1.0f'],
  ['Vertex color','Set a color inside a primitive block.','Medium',['glBegin(GL_TRIANGLES);','gl__________(1.0f, 0.0f, 0.0f);','glVertex2f(0.0f, 0.6f);'],'Color3f'],
  ['Alpha value','Make a color 60 percent opaque.','Medium',['glColor4f(1.0f, 0.0f, 0.0f, __________);'],'0.6f'],
  ['Blend source','Select the source alpha blend factor.','Hard',['glBlendFunc(__________, GL_ONE_MINUS_SRC_ALPHA);'],'GL_SRC_ALPHA'],
  ['Blend destination','Select the inverse destination factor.','Hard',['glBlendFunc(GL_SRC_ALPHA, __________);'],'GL_ONE_MINUS_SRC_ALPHA'],
  ['Stipple repeat','Stretch a dotted pattern with a repeat factor.','Medium',['glLineStipple(__________, 0xAAAA);'],'2'],
  ['Enable stipple','Turn line stippling on before drawing.','Easy',['gl__________(GL_LINE_STIPPLE);','glLineStipple(1, 0x00FF);'],'Enable'],
  ['Smooth triangle','Use three different vertex colors for a gradient.','Medium',['glBegin(GL_TRIANGLES);','glColor3f(__________, 0.0f, 0.0f);','glVertex2f(0.0f, 0.6f);'],'1.0f'],
  ['Opaque alpha','A fully opaque color has alpha ____.','Easy',['glColor4f(0.2f, 0.4f, 1.0f, __________);'],'1.0f'],
  ['Stipple pattern','Use an alternating bit pattern for fine dots.','Medium',['glLineStipple(1, __________);'],'0xAAAA'],
  ['Disable blending','Restore the previous state after transparent shapes.','Easy',['glEnd();','gl__________(GL_BLEND);'],'Disable'],
  ['Color interpolation','Smooth shading is represented by this constant.','Easy',['glShadeModel(__________);'],'GL_SMOOTH'],
  ['Line gallery','A line stipple pattern is enabled with this capability.','Easy',['glEnable(__________);','glLineStipple(1, 0x0C0F);'],'GL_LINE_STIPPLE']
);
modules[2].challenges.push(
  ['Stroke font','Use the GLUT call for vector-style text.','Easy',['glutStrokeCharacter(GLUT_STROKE_ROMAN, __________);'],'A'],
  ['Text color','Set text color before rasterizing a label.','Easy',['glColor3f(__________, 1.0f, 1.0f);','glRasterPos2f(0.0f, 0.0f);'],'0.0f'],
  ['Raster position','Place text at the origin.','Easy',['glRasterPos2f(__________, __________);'],'0.0f, 0.0f'],
  ['Move text right','Increase the X position from the keyboard callback.','Medium',['if (key == \'d\') positionX += __________;'],'0.1f'],
  ['Move text left','Decrease the X position with the opposite key.','Medium',['if (key == \'a\') positionX -= __________;'],'0.1f'],
  ['Keyboard signature','The first parameter in a GLUT keyboard callback is the pressed ____.','Easy',['void keyboard(unsigned char __________, int x, int y) {}'],'key'],
  ['Mouse coordinates','Read the horizontal click coordinate.','Easy',['void mouse(int button, int state, int __________, int y) {}'],'x'],
  ['Mouse motion','Register active dragging input.','Medium',['glut__________(drag);'],'MotionFunc'],
  ['Passive motion','Track the cursor without a button held.','Medium',['glut__________(track);'],'PassiveMotionFunc'],
  ['Window entry','Detect when the cursor enters or leaves.','Hard',['glut__________(entry);'],'EntryFunc'],
  ['Idle animation','Register a callback that runs continuously.','Medium',['glut__________(animate);'],'IdleFunc'],
  ['Timer delay','Schedule work after 500 milliseconds.','Medium',['glutTimerFunc(__________, tick, 0);'],'500'],
  ['Timer callback','Ask GLUT to call the function after a delay.','Easy',['glutTimerFunc(1000, __________, 0);'],'tick'],
  ['Countdown','Decrease the timer value by one.','Easy',['seconds = seconds __________ 1;'],'-'],
  ['Redisplay animation','Request another frame during motion.','Easy',['glutPost__________();'],'Redisplay']
);
modules[3].challenges.push(
  ['Vertex pointer','Describe two-component floating-point vertices.','Medium',['glVertexPointer(__________, GL_FLOAT, 0, vertices);'],'2'],
  ['Enable vertices','Turn on vertex-array rendering.','Easy',['glEnableClientState(__________);'],'GL_VERTEX_ARRAY'],
  ['Disable vertices','Turn off the vertex client state.','Easy',['glDisableClientState(__________);'],'GL_VERTEX_ARRAY'],
  ['Draw four vertices','Render a quad from the first four array entries.','Easy',['glDrawArrays(GL_QUADS, 0, __________);'],'4'],
  ['Draw points','Render six points from a vertex array.','Easy',['glDrawArrays(__________, 0, 6);'],'GL_POINTS'],
  ['Color pointer','Describe three floating-point color channels.','Medium',['glColorPointer(__________, GL_FLOAT, 0, colors);'],'3'],
  ['Unsigned indices','Use the correct index data type.','Easy',['glDrawElements(GL_TRIANGLES, 3, __________, indices);'],'GL_UNSIGNED_INT'],
  ['Index order','The first triangle uses indices zero, one, and ____.','Easy',['unsigned int indices[] = {0, 1, __________};'],'2'],
  ['Shared vertices','Indexed rendering helps avoid duplicate ____.','Easy',['glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, __________);'],'indices'],
  ['Interleaved data','A stride of zero means the data is tightly ____.','Medium',['glVertexPointer(2, GL_FLOAT, 0, __________);'],'vertices'],
  ['First offset','Draw the second triangle starting at vertex ____.','Medium',['glDrawArrays(GL_TRIANGLES, __________, 3);'],'3'],
  ['Triangle fan','Render a pinwheel with one center vertex.','Easy',['glDrawArrays(__________, 0, count);'],'GL_TRIANGLE_FAN'],
  ['Color state','Enable the color client array before drawing.','Easy',['glEnableClientState(__________);'],'GL_COLOR_ARRAY'],
  ['Array cleanup','Disable the color array after rendering.','Easy',['glDisableClientState(__________);'],'GL_COLOR_ARRAY'],
  ['Composite scene','Issue a second indexed draw call with this function.','Medium',['glDraw__________(GL_QUADS, 4, GL_UNSIGNED_INT, indices);'],'Elements']
);

// Advanced extension set: ten additional challenges per module, bringing each
// module to thirty snippets in total.
modules[0].challenges.push(
  ['Triangle strip','Build connected triangles from a shared edge.','Medium',['glBegin(__________);','glVertex2f(-0.8f, -0.5f);','glVertex2f(-0.8f, 0.5f);','glEnd();'],'GL_TRIANGLE_STRIP'],
  ['Triangle fan','Use one center vertex to build a circular shape.','Medium',['glBegin(__________);','glVertex2f(0.0f, 0.0f);','glEnd();'],'GL_TRIANGLE_FAN'],
  ['Quadrilateral','Submit exactly four vertices as a filled quad.','Easy',['glBegin(__________);','glVertex2f(-0.5f, -0.5f);','glVertex2f(0.5f, -0.5f);','glVertex2f(0.5f, 0.5f);','glVertex2f(-0.5f, 0.5f);','glEnd();'],'GL_QUADS'],
  ['Polygon vertex order','Keep polygon vertices in a consistent __________ direction.','Medium',['glBegin(GL_POLYGON);','// list vertices in a consistent __________ direction','glEnd();'],'clockwise'],
  ['Clear color red','Set the red channel of the warm background color.','Easy',['glClearColor(__________, 0.85f, 0.6f, 1.0f);'],'1.0f'],
  ['Window title','Pass the title text when creating the window.','Easy',['glutCreateWindow("__________");'],'OpenGL Scene'],
  ['Main loop','Start GLUT event processing after setup.','Easy',['glutDisplayFunc(display);','glut__________();'],'MainLoop'],
  ['Coordinate y','Place a vertex above the origin with a positive ____.','Easy',['glVertex2f(0.0f, __________);'],'0.5f'],
  ['Point grid loop','Keep generating points while x is less than or equal to the edge.','Medium',['for (float x = -0.8f; x __________ 0.8f; x += 0.2f) {}'],'<='],
  ['Polygon closure','Choose a primitive mode that closes back to its first vertex.','Easy',['glBegin(__________);','glVertex2f(0.0f, 0.5f);','glVertex2f(-0.5f, -0.5f);','glVertex2f(0.5f, -0.5f);','glEnd();'],'GL_LINE_LOOP'],
  ['Flush after scene','Finish a display callback with the command that submits work.','Easy',['glEnd();','gl__________();'],'Flush']
);
modules[1].challenges.push(
  ['Green color','Set a pure green float color.','Easy',['glColor3f(0.0f, __________, 0.0f);'],'1.0f'],
  ['Blue color byte','Set a pure blue unsigned-byte color.','Easy',['glColor3ub(0, 0, __________);'],'255'],
  ['Blend enable','Turn blending on before transparent geometry.','Easy',['gl__________(GL_BLEND);'],'Enable'],
  ['Blend disable','Turn blending off after transparent geometry.','Easy',['gl__________(GL_BLEND);'],'Disable'],
  ['Alpha transparent','A fully transparent color has alpha ____.','Easy',['glColor4f(1.0f, 0.0f, 0.0f, __________);'],'0.0f'],
  ['Wide line','Set a thick line width for a gradient.','Easy',['gl__________(10.0f);','glBegin(GL_LINES);'],'LineWidth'],
  ['Stipple factor','Repeat a stipple pattern once per pattern unit.','Easy',['glLineStipple(__________, 0x00FF);'],'1'],
  ['Smooth model','Select interpolated shading before a gradient triangle.','Easy',['glShadeModel(__________);'],'GL_SMOOTH'],
  ['Flat model','Select flat shading when one provoking color should win.','Medium',['glShadeModel(__________);'],'GL_FLAT'],
  ['Current state','A later vertex inherits the current ____.','Easy',['glColor3f(1.0f, 0.0f, 0.0f);','// the next vertex inherits the current __________'],'color']
);
modules[2].challenges.push(
  ['Bitmap font','Choose the compact 8-by-13 GLUT bitmap font.','Easy',['glutBitmapCharacter(GLUT_BITMAP__________, ch);'],'8_BY_13'],
  ['Stroke font name','Use the Roman GLUT stroke font.','Easy',['glutStrokeCharacter(GLUT_STROKE__________, ch);'],'ROMAN'],
  ['Keyboard registration','Connect the callback named keyboard.','Easy',['glut__________(keyboard);'],'KeyboardFunc'],
  ['Mouse registration','Connect the callback named mouse.','Easy',['glut__________(mouse);'],'MouseFunc'],
  ['Dragging registration','Connect the active-motion callback.','Medium',['glut__________(drag);'],'MotionFunc'],
  ['Idle registration','Connect an animation function to the idle event.','Medium',['glut__________(animate);'],'IdleFunc'],
  ['Timer interval','Schedule the next tick after one second.','Easy',['glutTimerFunc(__________, tick, 0);'],'1000'],
  ['Entry state','The entry callback receives GLUT_ENTERED or GLUT_LEFT.','Medium',['void entry(int state) { if (state == GLUT__________) {} }'],'LEFT'],
  ['Mouse button','Check whether the pressed button is the left button.','Easy',['if (button == GLUT_LEFT__________) {}'],'BUTTON'],
  ['Animation step','Advance the angle by a small float step.','Easy',['angle += __________;','glutPostRedisplay();'],'0.05f']
);
modules[3].challenges.push(
  ['Vertex count','Draw a six-vertex line strip from the array.','Easy',['glDrawArrays(GL_LINE_STRIP, 0, __________);'],'6'],
  ['Array offset','Start drawing at the first array element.','Easy',['glDrawArrays(GL_TRIANGLES, __________, 3);'],'0'],
  ['Index count','Render six indices as two triangles.','Easy',['glDrawElements(GL_TRIANGLES, __________, GL_UNSIGNED_INT, indices);'],'6'],
  ['Color data type','Use floating-point values for a color array.','Easy',['glColorPointer(3, __________, 0, colors);'],'GL_FLOAT'],
  ['Vertex data type','Use floating-point values for vertex positions.','Easy',['glVertexPointer(2, __________, 0, vertices);'],'GL_FLOAT'],
  ['Stride','Tightly packed array data uses a stride of ____.','Easy',['glVertexPointer(2, GL_FLOAT, __________, vertices);'],'0'],
  ['Index buffer','Pass the index array as the final pointer.','Easy',['glDrawElements(GL_TRIANGLES, 3, GL_UNSIGNED_INT, __________);'],'indices'],
  ['Quad indices','A quad rendered as two triangles needs ____ indices.','Medium',['unsigned int indices[] = {0, 1, 2, 0, 2, __________};'],'3'],
  ['Position array','Store the vertex positions in a named array.','Easy',['GLfloat __________[] = {-0.5f, -0.5f, 0.5f, 0.5f};'],'vertices'],
  ['Color array','Store per-vertex RGB values in a named array.','Easy',['GLfloat __________[] = {1.0f, 0.0f, 0.0f};'],'colors']
);

const state = JSON.parse(localStorage.getItem('visgra-quest') || '{}');
let current = Number(state.current || 0); let challenge = Number(state.challenge || 0); let xp = Number(state.xp || 0); let streak = Number(state.streak || 0); let checked = false;
const $ = id => document.getElementById(id);
function save(){localStorage.setItem('visgra-quest',JSON.stringify({current,challenge,xp,streak}));}
function renderTabs(){ $('module-tabs').innerHTML=modules.map((m,i)=>`<button class="module-tab ${i===current?'active':''}" data-module="${i}"><span class="num">0${i+1}</span><span class="tab-arrow">↗</span><h3>${m.title}</h3><p>${m.short}</p></button>`).join(''); document.querySelectorAll('.module-tab').forEach(b=>b.onclick=()=>{current=+b.dataset.module;challenge=0;checked=false;render();document.querySelector('#reviewer').scrollIntoView({behavior:'smooth',block:'start'});});}
function codeHTML(lines, answers){let n=0;return lines.map(line=>{const escaped=line.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');let parts=escaped.split('__________');const content=parts.map((part,i)=>part+(i<parts.length-1?`<span class="blank"><input aria-label="blank ${n+1}" data-answer="${answers[n++]||''}" autocomplete="off"></span>`:'')).join('');return `<span class="code-line">${content}</span>`;}).join('');}
function render(){const m=modules[current], c=m.challenges[challenge]; renderTabs();$('module-number').textContent=`MODULE 0${current+1}`;$('module-title').textContent=m.title;$('module-subtitle').textContent=m.desc;$('module-progress').textContent=`${challenge} / ${m.challenges.length}`;$('progress-bar').style.width=`${challenge/m.challenges.length*100}%`;$('xp').textContent=xp;$('streak').textContent=streak;const answerList=Array.isArray(c[4])?c[4]:c[4].split(', ');const challengeClass=current===4?'challenge mixed-challenge':'challenge';$('challenge-card').innerHTML=`<article class="${challengeClass}"><div class="challenge-top"><span class="difficulty">${c[2].toUpperCase()}</span><span class="challenge-index">CHALLENGE ${String(challenge+1).padStart(2,'0')} / ${m.challenges.length}</span></div><h3>${c[0]}</h3><p class="prompt">${c[1]}</p><div class="code-wrap"><pre>${codeHTML(c[3],answerList)}</pre></div><div class="feedback" id="feedback"></div><div class="answer" id="answer">Answer key: <strong>${answerList.join(', ')}</strong></div><div class="actions"><div class="left-actions"><button class="button ghost" id="hint">◌ Hint</button><button class="button text" id="reveal">Reveal answer</button></div><div class="right-actions"><button class="button primary" id="check">Check answer <span>→</span></button></div></div></article>`; $('check').onclick=check;$('hint').onclick=hint;$('reveal').onclick=()=>{$('answer').classList.add('show');$('toast').textContent='Answer revealed — study it, then try the next one.';toast();};document.querySelectorAll('input').forEach(i=>i.addEventListener('keydown',e=>{if(e.key==='Enter')check();}));}
function norm(v){return v.replace(/\s+/g,'').toLowerCase()}function check(){const inputs=[...document.querySelectorAll('input')], good=inputs.every(i=>norm(i.value)===norm(i.dataset.answer));const f=$('feedback');if(good){if(!checked){xp+=10;streak++;checked=true;save();}$('xp').textContent=xp;$('streak').textContent=streak;f.className='feedback good';f.innerHTML='✓ Nice work. That line belongs in your toolkit.';$('check').textContent=challenge===modules[current].challenges.length-1?'Finish module →':'Next challenge →';$('check').onclick=next;}else{streak=0;save();$('streak').textContent=streak;f.className='feedback bad';f.innerHTML='Not quite yet. Check the spelling, punctuation, and API name.';}}
function next(){if(challenge<modules[current].challenges.length-1){challenge++;checked=false;save();render();}else{challenge=modules[current].challenges.length;save();$('progress-bar').style.width='100%';$('module-progress').textContent=`${challenge} / ${modules[current].challenges.length}`;$('challenge-card').innerHTML='<div class="challenge"><h3 class="completed">Module complete. +50 bonus XP ✦</h3><p class="prompt">You cleared this run. Switch modules above to keep building your graphics toolkit.</p><button class="button primary" onclick="current=(current+1)%modules.length;challenge=0;checked=false;render()">Continue to next module →</button></div>';xp+=50;save();$('xp').textContent=xp;}}
function hint(){const c=modules[current].challenges[challenge];const answerText=Array.isArray(c[4])?c[4].join(' '):c[4];$('toast').textContent=`Hint: look for the ${answerText.includes('GL_')?'OpenGL constant':'exact callback, value, or API name'} from this module.`;toast();}function toast(){const t=$('toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400)}function restartModule(){challenge=0;checked=false;streak=0;save();render();$('toast').textContent=`${modules[current].title} restarted.`;toast();}$('reset-all').onclick=()=>{if(confirm('Reset all XP and progress?')){localStorage.removeItem('visgra-quest');location.reload();}};render();$('restart-module').onclick=restartModule;
