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
  {title:'VBOs & GPU Buffers', short:'GLEW, VBOs, indexing, mapping', desc:'Build GPU-resident geometry with buffer objects, usage hints, index buffers, interleaved data, and glMapBuffer.', color:'mint', challenges:[
    ['GLEW header','Include the extension loader required for VBO functions.','Easy',['#include <GL/__________>'],['glew.h'],'GLEW declares modern OpenGL entry points so the VBO functions can be loaded.'],
    ['Generate a VBO','Create one buffer object handle.','Easy',['GLuint vbo;','glGenBuffers(1, &__________);'],['vbo'],'glGenBuffers writes a GPU buffer name into the handle you provide.'],
    ['Bind vertex data','Bind the buffer as the current vertex-data target.','Easy',['glBindBuffer(GL_ARRAY_BUFFER, __________);'],['vbo'],'GL_ARRAY_BUFFER tells OpenGL that subsequent vertex data uses this buffer.'],
    ['Upload vertex data','Send the vertex array into the currently bound VBO.','Easy',['glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL__________);'],['STATIC_DRAW'],'The usage hint describes how the application expects the data to be used.'],
    ['Dynamic usage','Choose the usage hint for data updated repeatedly.','Medium',['glBufferData(GL_ARRAY_BUFFER, sizeof(points), points, GL__________);'],['DYNAMIC_DRAW'],'GL_DYNAMIC_DRAW is intended for data changed often and drawn often.'],
    ['Enable VBO positions','Enable the client-side vertex array before pointing to the VBO.','Easy',['glEnableClientState(GL__________);'],['VERTEX_ARRAY'],'The vertex-array capability allows OpenGL to read positions from the bound buffer.'],
    ['Describe VBO positions','Describe two floating-point coordinates per vertex.','Easy',['glVertexPointer(__________, GL_FLOAT, 0, 0);'],['2'],'The first argument is the number of components in each vertex.'],
    ['Draw VBO vertices','Render three vertices from the bound VBO.','Easy',['glDrawArrays(GL_TRIANGLES, 0, __________);'],['3'],'glDrawArrays uses the currently configured vertex pointer and count.'],
    ['Generate index buffer','Create a second buffer for element indices.','Medium',['GLuint ebo;','glGenBuffers(1, &__________);'],['ebo'],'An element buffer stores indices that select vertices for indexed drawing.'],
    ['Bind index buffer','Bind the element buffer to the correct target.','Medium',['glBindBuffer(GL__________, ebo);'],['ELEMENT_ARRAY_BUFFER'],'This target makes the bound buffer the source of index data.'],
    ['Indexed draw','Draw six indices as two triangles.','Medium',['glDrawElements(GL_TRIANGLES, __________, GL_UNSIGNED_INT, 0);'],['6'],'The count is the number of index values, not the number of triangles.'],
    ['Separate color VBO','Bind the color buffer before uploading colors.','Medium',['glBindBuffer(GL_ARRAY_BUFFER, __________);','glBufferData(GL_ARRAY_BUFFER, sizeof(colors), colors, GL_STATIC_DRAW);'],['colorVbo'],'Keeping position and color data in separate buffers makes each attribute independently replaceable.'],
    ['Describe colors','Describe three floating-point color components.','Medium',['glColorPointer(__________, GL_FLOAT, 0, 0);'],['3'],'RGB colors contain three floating-point components per vertex.'],
    ['Interleaved stride','Set the stride for position-plus-color records.','Hard',['glVertexPointer(3, GL_FLOAT, __________, 0);'],['24'],'A 24-byte stride skips from one six-float record to the next.'],
    ['Color offset','Point past the position data inside an interleaved record.','Hard',['glColorPointer(3, GL_FLOAT, 24, (void*)__________);'],['12'],'Three position floats take 12 bytes, so color starts at byte offset 12.'],
    ['Map buffer','Map the bound buffer so the CPU can edit its GPU data.','Medium',['float* mapped = (float*)glMapBuffer(GL_ARRAY_BUFFER, GL__________);'],['WRITE_ONLY'],'GL_WRITE_ONLY requests a mapping intended for CPU writes.'],
    ['Unmap buffer','Finish a mapped-buffer edit before drawing.','Medium',['mapped[0] += 0.1f;','gl__________(GL_ARRAY_BUFFER);'],['UnmapBuffer'],'Unmapping tells OpenGL the CPU edit is complete and the buffer may be used again.'],
    ['Timer animation','Schedule the next VBO animation update.','Medium',['glutTimerFunc(16, __________, 0);'],['animate'],'A timer callback creates a predictable animation update loop.'],
    ['Delete VBOs','Release both GPU buffers during cleanup.','Hard',['GLuint buffers[] = {vbo, ebo};','glDeleteBuffers(2, __________);'],['buffers'],'Deleting buffers releases GPU memory that the program no longer needs.'],
    ['Clean client state','Disable the vertex array after VBO rendering.','Easy',['glDisableClientState(GL__________);'],['VERTEX_ARRAY'],'Disabling the client state prevents later draws from accidentally using the old pointer.']
  ]},
  {title:'3D Transforms & Cubes', short:'Matrices, transforms, culling, callbacks', desc:'Apply transformations to GPU-resident geometry and build animated 3D scenes with matrix math, callbacks, and cleanup.', color:'lime', challenges:[
    ['3D vertex','Submit a vertex with x, y, and z coordinates.','Easy',['glVertex__________(0.0f, 0.5f, 0.0f);'],['3f'],'glVertex3f adds the depth coordinate needed for a 3D position.'],
    ['Cube faces','Use quads for a four-corner cube face.','Easy',['glBegin(GL__________);','glVertex3f(-1.0f, -1.0f, 1.0f);'],['QUADS'],'Each cube face is described by four vertices in a consistent order.'],
    ['Translate object','Move the cube along the x axis.','Easy',['gl__________(0.5f, 0.0f, 0.0f);'],['Translatef'],'Translation changes an object position without changing its vertex data.'],
    ['Scale object','Make the cube half as large on every axis.','Easy',['gl__________(0.5f, 0.5f, 0.5f);'],['Scalef'],'Scaling multiplies the object coordinates by the supplied factors.'],
    ['Rotate around Z','Rotate the object around the z axis.','Easy',['glRotatef(angle, 0.0f, 0.0f, __________);'],['1.0f'],'The z-axis unit vector is (0, 0, 1), so rotation uses 1.0 for z.'],
    ['Rotate around Y','Rotate the cube around the vertical axis.','Medium',['glRotatef(angle, 0.0f, __________, 0.0f);'],['1.0f'],'The y-axis unit vector identifies the vertical rotation axis.'],
    ['Save matrix','Protect the current transform before changing it.','Easy',['gl__________();','glTranslatef(1.0f, 0.0f, 0.0f);'],['PushMatrix'],'PushMatrix saves the current matrix so another object can use its own transform.'],
    ['Restore matrix','Return to the previous transform after drawing.','Easy',['drawCube();','gl__________();'],['PopMatrix'],'PopMatrix restores the matrix saved before the object transform.'],
    ['Homogeneous point','A position uses homogeneous coordinate w equal to ____.','Easy',['float point[4] = {x, y, z, __________};'],['1.0f'],'A point uses w=1 so translations affect it.'],
    ['Homogeneous direction','A direction vector uses homogeneous w equal to ____.','Medium',['float direction[4] = {dx, dy, dz, __________};'],['0.0f'],'A direction uses w=0 so translations do not move it.'],
    ['Upload color change','Replace buffer data starting at byte offset zero.','Medium',['glBufferSubData(GL_ARRAY_BUFFER, __________, sizeof(colors), colors);'],['0'],'Offset zero updates the beginning of the currently bound buffer.'],
    ['Upload one color','Use the color buffer target for a color object.','Medium',['glBindBuffer(GL__________, colorVbo);','glBufferSubData(GL_ARRAY_BUFFER, 0, sizeof(color), color);'],['ARRAY_BUFFER'],'Color attributes are stored in the same array-buffer target as positions.'],
    ['Array element','Draw one vertex from the enabled client array.','Medium',['glBegin(GL_POINTS);','gl__________(index);','glEnd();'],['ArrayElement'],'glArrayElement submits the enabled array attributes at one index.'],
    ['Array loop','Visit five cube colors with a counting loop.','Medium',['for (int i = 0; i ______ 5; i++) {','  glArrayElement(i);','}'],['<'],'The loop must stop before five so it visits indices 0 through 4.'],
    ['Debug callback','Register the OpenGL error/debug callback.','Hard',['gl__________(debugCallback, nullptr);'],['DebugMessageCallback'],'The debug callback receives diagnostic messages from the OpenGL implementation.'],
    ['Enable culling','Turn on face culling for a closed cube.','Medium',['gl__________(GL_CULL_FACE);'],['Enable'],'Culling skips faces that should not be visible from the current view.'],
    ['Cull back faces','Cull faces pointing away from the camera.','Medium',['glCullFace(GL__________);'],['BACK'],'Back-face culling is the usual choice for solid closed objects.'],
    ['Counter-clockwise winding','Set the front-face winding convention.','Medium',['glFrontFace(GL__________);'],['CCW'],'With CCW winding, counter-clockwise vertices are treated as front-facing.'],
    ['Rotate timer','Request another frame after changing the rotation.','Medium',['angle += 1.0f;','glutPost__________();','glutTimerFunc(16, rotate, 0);'],['Redisplay'],'Redisplay schedules a new draw, while the timer schedules the next rotation update.'],
    ['Cube cleanup','Delete the position and color buffers at shutdown.','Hard',['GLuint buffers[] = {positionVbo, colorVbo};','glDeleteBuffers(2, __________);'],['buffers'],'Explicit cleanup releases GPU resources before the application exits.']
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

modules[4].challenges.push(
  ['Buffer usage hint','Choose a static hint for geometry uploaded once.','Easy',['glBufferData(GL_ARRAY_BUFFER, size, data, GL__________);'],['STATIC_DRAW'],'STATIC_DRAW tells the driver that the data is uploaded once and drawn repeatedly.'],
  ['Bind before upload','Bind the VBO before sending its data.','Easy',['gl__________(GL_ARRAY_BUFFER, vbo);','glBufferData(GL_ARRAY_BUFFER, size, data, GL_STATIC_DRAW);'],['BindBuffer'],'OpenGL uploads data into whichever buffer is currently bound to the target.'],
  ['Position offset','Start an interleaved position attribute at byte offset zero.','Medium',['glVertexPointer(3, GL_FLOAT, 24, (void*)__________);'],['0'],'The first attribute begins at the start of each interleaved record.'],
  ['Color offset','Skip three floats to reach color data.','Medium',['glColorPointer(3, GL_FLOAT, 24, (void*)__________);'],['12'],'Three floats are 12 bytes, so the color attribute begins after the position.'],
  ['Map read-write','Map a buffer for both reading and writing.','Hard',['void* data = glMapBuffer(GL_ARRAY_BUFFER, GL__________);'],['READ_WRITE'],'GL_READ_WRITE gives the CPU permission to inspect and edit mapped GPU data.'],
  ['Map failure check','Test a mapped pointer before editing it.','Medium',['float* mapped = (float*)glMapBuffer(GL_ARRAY_BUFFER, GL_WRITE_ONLY);','if (mapped != __________) { mapped[0] += 0.1f; }'],['nullptr'],'A null pointer means the mapping failed and must not be dereferenced.'],
  ['Unbind VBO','Clear the current array-buffer binding after setup.','Easy',['glBindBuffer(GL_ARRAY_BUFFER, __________);'],['0'],'Binding zero restores the default array-buffer binding.'],
  ['Element count','Draw a quad from six unsigned indices.','Easy',['glDrawElements(GL_TRIANGLES, __________, GL_UNSIGNED_INT, 0);'],['6'],'Two triangles require six index values when the quad shares vertices.'],
  ['Timer interval','Update a VBO animation about sixty times per second.','Medium',['glutTimerFunc(__________, animate, 0);'],['16'],'Sixteen milliseconds is approximately one update every sixtieth of a second.'],
  ['Delete one buffer','Release a single VBO during cleanup.','Easy',['glDeleteBuffers(__________, &vbo);'],['1'],'The first argument tells OpenGL how many buffer handles are being deleted.']
);
modules[5].challenges.push(
  ['Translate in depth','Move a 3D object toward the camera along z.','Easy',['gl__________(0.0f, 0.0f, -2.0f);'],['Translatef'],'A negative z translation moves the object toward the typical camera direction.'],
  ['Uniform scale','Scale a cube equally on all three axes.','Easy',['glScalef(__________, __________, __________);'],['0.5f','0.5f','0.5f'],'Equal scale factors preserve the cube proportions while shrinking it.'],
  ['Rotate angle','Use the current angle in a z-axis rotation.','Easy',['glRotatef(__________, 0.0f, 0.0f, 1.0f);'],['angle'],'The first argument controls how many degrees the object rotates.'],
  ['Matrix mode','Select the model-view matrix before object transforms.','Medium',['glMatrixMode(GL__________);'],['MODELVIEW'],'Model-view is the matrix that positions and orients objects in the scene.'],
  ['Load identity','Reset the current matrix before building a new transform.','Easy',['gl__________();','glTranslatef(0.0f, 0.0f, -3.0f);'],['LoadIdentity'],'Loading identity prevents the previous frame transform from accumulating accidentally.'],
  ['Buffer subdata size','Update the complete color array.','Medium',['glBufferSubData(GL_ARRAY_BUFFER, 0, __________, colors);'],['sizeof(colors)'],'sizeof(colors) supplies the number of bytes occupied by the color array.'],
  ['Face winding','Declare clockwise vertices as front-facing.','Medium',['glFrontFace(GL__________);'],['CW'],'The winding declaration tells culling which vertex order represents the front.'],
  ['Disable culling','Turn face culling off while debugging both sides.','Easy',['gl__________(GL_CULL_FACE);'],['Disable'],'Disabling culling makes both front and back faces render.'],
  ['Debug severity','Filter a debug message by its severity value.','Hard',['if (severity == GL_DEBUG_SEVERITY__________) {','  cerr << message;','}'],['HIGH'],'High-severity messages identify serious OpenGL problems.'],
  ['Timer cleanup','Stop using a callback after the animation ends.','Medium',['running = false;','glutPostRedisplay();','// do not schedule another glut__________ call'],['TimerFunc'],'Avoiding another timer registration lets the animation stop cleanly.']
);

const state = JSON.parse(localStorage.getItem('visgra-quest') || '{}');
let current = Number(state.current || 0); let challenge = Number(state.challenge || 0); let xp = Number(state.xp || 0); let streak = Number(state.streak || 0); let checked = false;
const $ = id => document.getElementById(id);
function save(){localStorage.setItem('visgra-quest',JSON.stringify({current,challenge,xp,streak}));}
function renderTabs(){ $('module-tabs').innerHTML=modules.map((m,i)=>`<button class="module-tab ${i===current?'active':''}" data-module="${i}"><span class="num">0${i+1}</span><span class="tab-arrow">↗</span><h3>${m.title}</h3><p>${m.short}</p></button>`).join(''); document.querySelectorAll('.module-tab').forEach(b=>b.onclick=()=>{current=+b.dataset.module;challenge=0;checked=false;render();document.querySelector('#reviewer').scrollIntoView({behavior:'smooth',block:'start'});});}
function codeHTML(lines, answers){let n=0;return lines.map(line=>{const escaped=line.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');let parts=escaped.split('__________');const content=parts.map((part,i)=>part+(i<parts.length-1?`<span class="blank"><input aria-label="blank ${n+1}" data-answer="${answers[n++]||''}" autocomplete="off"></span>`:'')).join('');return `<span class="code-line">${content}</span>`;}).join('');}
function render(){const m=modules[current], c=m.challenges[challenge]; renderTabs();$('module-number').textContent=`MODULE 0${current+1}`;$('module-title').textContent=m.title;$('module-subtitle').textContent=m.desc;$('module-progress').textContent=`${challenge} / ${m.challenges.length}`;$('progress-bar').style.width=`${challenge/m.challenges.length*100}%`;$('xp').textContent=xp;$('streak').textContent=streak;const answerList=Array.isArray(c[4])?c[4]:c[4].split(', ');const explanation=c[5]||'This answer completes the OpenGL statement with the required API name, constant, or value.';const challengeClass=current>=4?'challenge mixed-challenge':'challenge';$('challenge-card').innerHTML=`<article class="${challengeClass}"><div class="challenge-top"><span class="difficulty">${c[2].toUpperCase()}</span><span class="challenge-index">CHALLENGE ${String(challenge+1).padStart(2,'0')} / ${m.challenges.length}</span></div><h3>${c[0]}</h3><p class="prompt">${c[1]}</p><div class="code-wrap"><pre>${codeHTML(c[3],answerList)}</pre></div><div class="feedback" id="feedback"></div><div class="answer" id="answer">Answer key: <strong>${answerList.join(', ')}</strong><span class="answer-explanation"><strong>Why:</strong> ${explanation}</span></div><div class="actions"><div class="left-actions"><button class="button ghost" id="hint">◌ Hint</button><button class="button text" id="reveal">Reveal answer</button></div><div class="right-actions"><button class="button ghost" id="prev-question" ${challenge===0?'disabled':''}>← Previous</button><button class="button ghost" id="next-question" ${challenge===m.challenges.length-1?'disabled':''}>Next question →</button><button class="button primary" id="check">Check answer <span>→</span></button></div></div></article>`; $('check').onclick=check;$('hint').onclick=hint;$('reveal').onclick=()=>{$('answer').classList.add('show');$('toast').textContent='Answer revealed — study it, then try the next one.';toast();};$('prev-question').onclick=()=>navigateQuestion(-1);$('next-question').onclick=()=>navigateQuestion(1);document.querySelectorAll('input').forEach(i=>i.addEventListener('keydown',e=>{if(e.key==='Enter')check();}));}
function norm(v){return v.replace(/\s+/g,'').toLowerCase()}function check(){const inputs=[...document.querySelectorAll('input')], good=inputs.every(i=>norm(i.value)===norm(i.dataset.answer));const f=$('feedback');if(good){if(!checked){xp+=10;streak++;checked=true;save();}$('xp').textContent=xp;$('streak').textContent=streak;f.className='feedback good';f.innerHTML='✓ Nice work. That line belongs in your toolkit.';$('check').textContent=challenge===modules[current].challenges.length-1?'Finish module →':'Next challenge →';$('check').onclick=next;}else{streak=0;save();$('streak').textContent=streak;f.className='feedback bad';f.innerHTML='Not quite yet. Check the spelling, punctuation, and API name.';}}
function next(){if(challenge<modules[current].challenges.length-1){challenge++;checked=false;save();render();}else{challenge=modules[current].challenges.length;save();$('progress-bar').style.width='100%';$('module-progress').textContent=`${challenge} / ${modules[current].challenges.length}`;$('challenge-card').innerHTML='<div class="challenge"><h3 class="completed">Module complete. +50 bonus XP ✦</h3><p class="prompt">You cleared this run. Switch modules above to keep building your graphics toolkit.</p><button class="button primary" onclick="current=(current+1)%modules.length;challenge=0;checked=false;render()">Continue to next module →</button></div>';xp+=50;save();$('xp').textContent=xp;}}
function navigateQuestion(direction){const target=challenge+direction;if(target<0||target>=modules[current].challenges.length)return;challenge=target;checked=false;save();render();}
function hint(){const c=modules[current].challenges[challenge];const answerText=Array.isArray(c[4])?c[4].join(' '):c[4];$('toast').textContent=`Hint: look for the ${answerText.includes('GL_')?'OpenGL constant':'exact callback, value, or API name'} from this module.`;toast();}function toast(){const t=$('toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400)}function restartModule(){challenge=0;checked=false;streak=0;save();render();$('toast').textContent=`${modules[current].title} restarted.`;toast();}$('reset-all').onclick=()=>{if(confirm('Reset all XP and progress?')){localStorage.removeItem('visgra-quest');location.reload();}};render();$('restart-module').onclick=restartModule;
