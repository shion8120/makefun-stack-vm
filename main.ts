// make.fun tiny stack ISA v1, entry for the "Build a tiny stack virtual machine" bounty (tiny-stack-vm-01)
// tiny stack VM: runs every /input/<id> program, writes stdout.bin and exit.txt
import{readdirSync as L,readFileSync as R,writeFileSync as W,mkdirSync as K,existsSync as X}from'node:fs'
const E=process.env,I=E.MAKEFUN_INPUT_DIR??'/input',O=E.MAKEFUN_OUTPUT_DIR??'/output',T={}
'00000 01101 02401 03010 04012 05022 06023 07033 10021 11021 12021 13021 14021 15021 16021 17011 18021 19021 1a021 1b011 1c021 1d021 1e021 20021 21021 22021 30200 31210 32210 33200 34000 40011 41020 50010 51010 52001 53010'.split(' ').map(s=>T[parseInt(s.slice(0,2),16)]=[+s[2],+s[3],+s[4]])
function run(p,u){const n=p.length,D=new Int32Array(257),C=[],M=new Int32Array(256),o=new Uint8Array(65536)
// end(code): halt, exit or trap; a trap keeps the output written so far (the trapping instruction wrote nothing)
let s=0,olen=0,q=0,c=0,t=0,end=(e)=>[o.subarray(0,olen),e]
for(;;){if(t==1e6)return end(10);if(c<0||c>=n)return end(9);const z=p[c],d=T[z];if(!d)return end(5)
const[m,a,b]=d;if(c+m>=n)return end(9);t++;const x=c+1+m;if(s<a)return end(2);if(s-a+b>256)return end(3);c=x
let A=D[s-2],B=D[s-1],r
if(z>15&&z<35&&z!=23&&z!=27){if(z>18&&z<23&&!B)return end(4)
r=z==16?A+B:z==17?A-B:z==18?Math.imul(A,B):z==19?A/B:z==20?A%B:z==21?(A>>>0)/(B>>>0):z==22?(A>>>0)%(B>>>0):z==24?A&B:z==25?A|B:z==26?A^B:z==28?A<<B:z==29?A>>B:z==30?A>>>B:z==32?+(A==B):z==33?+(A<B):+(A>>>0<B>>>0)
D[s-2]=r;s--;continue}
switch(z){case 0:return end(0)
case 1:D[s++]=p[c-1]<<24>>24;break
case 2:D[s++]=p[c-4]|p[c-3]<<8|p[c-2]<<16|p[c-1]<<24;break
case 3:s--;break
case 4:D[s++]=B;break
case 5:D[s-1]=A;D[s-2]=B;break
case 6:D[s++]=A;break
case 7:r=D[s-3];D[s-3]=A;D[s-2]=B;D[s-1]=r;break
case 23:D[s-1]=-B;break
case 27:D[s-1]=~B;break
case 48:case 49:case 50:r=(p[c-2]|p[c-1]<<8)<<16>>16;if(z==48||(z==49)==!D[--s])c+=r;break
case 51:if(C.length>63)return end(7);C.push(c);c=p[c-2]|p[c-1]<<8;break
case 52:if(!C.length)return end(8);c=C.pop();break
case 64:if(B<0||B>255)return end(6);D[s-1]=M[B];break
case 65:if(B<0||B>255)return end(6);M[B]=A;s-=2;break
case 80:r=''+B;if(olen+r.length>65536)return end(11);s--;for(const h of r)o[olen++]=h.charCodeAt(0);break
case 81:if(olen>65535)return end(11);o[olen++]=B;s--;break
case 82:D[s++]=q<u.length?u[q++]:-1;break
case 83:return end(B&255)}}}
for(const i of L(I).sort()){const d=I+'/'+i,g=d+'/input.bin',[y,e]=run(R(d+'/program.bin'),X(g)?R(g):[]),w=O+'/'+i
K(w,{recursive:true});W(w+'/stdout.bin',y);W(w+'/exit.txt',e+'\n')}
