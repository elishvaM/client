// export default function About(){
//     return<>
//     <h1>זהו האתר המקצועי הראשון שלנוווו:)</h1>
//     <li key={key}
//             style={{
//               backgroundColor: 'white', minWidth: 280, minHeight: 350, margin: 20,
//               borderRadius: 15, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', display: 'block'
//             }}>
//             <p>{i}</p>
//             <img src="/imgs/product23_image1_2021-03-29_11-25-56.jpg"
//               style={{ borderRadius: '15px 15px 0px 0px', width: 280, height: 100 }}
//             />
//             {/* {i} */}
//             <div style={{
//               height: 200, paddingBottom: 5
//             }}
//               onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)} className={key}//{+i} 
//             >
//               {daysAtt[key].length != 0 ? daysAtt[key].map((i, key2) =>//{console.log(i)}??? למה לא משנה את i.status
//                 <><div style={{ display: 'flex' }}
//                   onMouseEnter={() => setIsHoverOne(!isHoverOne)}
//                   onMouseLeave={() => setIsHoverOne(!isHoverOne)} onContextMenu={() => setIsContextMenu(!isContextMenu)}>
//                   <IconButton sx={{ marginX: 3, height: 40, marginY: 'auto' }}
//                     onClick={() => {
//                       setIsDone(!isDone)
//                       //console.log(daysAtt[key].Status+ " aa "+i.Status)//???מה הוא לא מרנדר והאם נכון לגשת למערך כשיש לי את זה פה
//                       daysAtt[key][key2].Status = !daysAtt[key][key2].Status
//                       //console.log(daysAtt[key].Status+ " bb "+i.Status)
//                     }}>{/*??? סתם השתמשתי במשתנה כדי שירענן*/}

//                     {console.log(daysAtt[key])}
//                     {daysAtt[key][key2].Status ? <>{console.log(i.Status)}<DoneIcon sx={{
//                       borderRadius: 15
//                       , backgroundColor: 'green', color: 'white'
//                     }} /></> : <>{console.log(i.Status)}<CircleOutlinedIcon /></>}
//                   </IconButton>
//                   <p style={{ textDecoration: daysAtt[key][key2].Status ? 'line-through' : 'none', fontSize: 17 }}>
//                     {i.Name}
//                   </p>
//                   {!isHoverOne ?
//                     <p style={{
//                       position: 'relative', right: 20// marginRight:60
//                     }}> 2:30 </p>
//                     : <div style={{
//                       marginLeft: -6, marginTop: 7
//                     }}>
//                       <Tooltip title="צור רשימה"><IconButton><CreateIcon onClick={() => mynavigate("/mylist/" + i.Id)} /></IconButton></Tooltip>
//                       <Tooltip title="הזכר לי"><IconButton><NotificationsIcon /></IconButton></Tooltip>
//                       <Tooltip title="מחק"><IconButton><GridDeleteIcon /></IconButton></Tooltip></div>}
//                 </div><Divider /></>)
//                 : <>     ריק        
//                 </>}
//             </div>
//           </li>
//       </ul>
//     </>
// }