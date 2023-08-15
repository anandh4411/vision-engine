import { Injectable } from '@angular/core';
import { Peer, MediaConnection } from 'peerjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class PeerService {
  private socket: Socket | any;
  private peer: Peer;
  private localStream: MediaStream | any;
  private remoteStream: MediaStream | any;
  private currentRoom: string | any;
  peerId: any;

  constructor() {
    // http://localhost:3002
    this.socket = io(
      'https://vision-engine-communication-service-q76fygmh6-anandh4411.vercel.app'
    );
    this.peer = new Peer();
    this.peer.on('open', (id: string) => {
      this.peerId = id;
      console.log('My peer ID is: ' + id);
    });
    this.peer.on('call', (call: MediaConnection) => {
      this.answerCall(call);
    });
  }

  getPeerId(): string {
    return this.peerId;
  }

  getSocket() {
    return this.socket;
  }

  async getLocalStream(): Promise<MediaStream> {
    if (!this.localStream) {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
    }
    return this.localStream;
  }

  private answerCall(call: MediaConnection): void {
    this.getLocalStream()
      .then((stream: MediaStream) => {
        this.remoteStream = stream;

        call.answer(this.localStream);

        call.on('stream', (remoteStream: MediaStream) => {
          this.remoteStream = remoteStream;
          const remoteVideo = document.getElementById(
            'remote-video'
          ) as HTMLVideoElement;
          remoteVideo.srcObject = this.remoteStream;
        });
      })
      .catch((error) => {
        console.error('Error accessing local media:', error);
      });
  }

  createRoom(roomId: string): void {
    this.currentRoom = roomId;
  }

  joinRoom(roomId: string): void {
    this.currentRoom = roomId;
  }

  callPeer(peerId: string): void {
    if (this.currentRoom) {
      this.getLocalStream()
        .then((stream: MediaStream) => {
          this.remoteStream = stream;

          const call = this.peer.call(peerId, this.localStream);

          call.on('stream', (remoteStream: MediaStream) => {
            this.remoteStream = remoteStream;
            const remoteVideo = document.getElementById(
              'remote-video'
            ) as HTMLVideoElement;
            remoteVideo.srcObject = this.remoteStream;
          });
        })
        .catch((error) => {
          console.error('Error accessing local media:', error);
        });
    } else {
      console.error('You need to create or join a room before calling a peer.');
    }
  }

  getCurrentRoom(): string {
    return this.currentRoom;
  }
}
