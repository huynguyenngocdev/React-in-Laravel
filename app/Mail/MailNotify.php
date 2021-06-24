<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailNotify extends Mailable
{
    use Queueable, SerializesModels;

    public $data;
    public $files;
    /**
     * Create a new data instance.
     *
     * @return void
     */

    public function __construct($data, $files)
    {
        $this->data = $data;
        $this->files = $files;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        if ($this->files != null) {
            return $this->from('huy.diem@gmail.com')
                ->view('mails.mail-notify')
                ->subject('Email Contact')
                ->attach($this->files);
        } else {
            return $this->from('huy.diem@gmail.com')
                ->view('mails.mail-notify')
                ->subject('Email Contact');
        }
    }
}
