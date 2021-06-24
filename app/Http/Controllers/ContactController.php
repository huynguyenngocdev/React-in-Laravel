<?php

namespace App\Http\Controllers;

use App\Exports\ContactExport;
use App\Jobs\SendEmail;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Maatwebsite\Excel\Facades\Excel;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return IlluminateHttpResponse
     */
    public function index()
    {
        $contact = Contact::all();
        return response()->json($contact);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  IlluminateHttpRequest  $request
     * @return IlluminateHttpResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
        ]);

        $contact = Contact::create($request->all());

        $message = [
            'content' => 'Cám ơn bạn "' . $request->name . '" đã liên hệ.',
        ];

        SendEmail::dispatch($message, $request->email, null)->delay(now()->addMinute(1));

        return response()->json([
            'message' => 'contact created',
            'contact' => $contact
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  AppContact  $contact
     * @return IlluminateHttpResponse
     */
    public function show($id)
    {
        $contact = Contact::find($id);
        return response()->json($contact);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  AppContact  $contact
     * @return IlluminateHttpResponse
     */

    /**
     * Update the specified resource in storage.
     *
     * @param  IlluminateHttpRequest  $request
     * @param  AppContact  $contact
     * @return IlluminateHttpResponse
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'amount' => 'required',
            'description' => 'required' //optional if you want this to be required
        ]);
        $contact = Contact::find($id);

        $contact->name = $request->name;
        $contact->email = $request->mail;

        $contact->save();

        return response()->json([
            'message' => 'contact updated!',
            'contact' => $contact
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  AppContact  $contact
     * @return IlluminateHttpResponse
     */
    public function destroy($id)
    {
        $contact = Contact::find($id);
        $contact->delete();
        return response()->json([
            'message' => 'contact deleted'
        ]);
    }

    public function adminMailToClient(Request $request, $id)
    {
        $contact = Contact::find($id);
        $message = [
            'content' => $request->input('content'),
        ];

        $fileAttach = null;

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName('file');
            $file->move('temp', $fileName);
            $fileAttach = public_path('temp/' . $fileName);
        }

        SendEmail::dispatch($message, $contact->email, $fileAttach)->delay(now()->addMinute(1));

        if ($request->hasFile('file')) {
            File::delete(public_path('temp/' . $fileName));
        }

        return response()->json([
            'message' => 'admin sent email to client',
        ]);
    }

    public function exportContact()
    {
        return Excel::download(new ContactExport, 'contacts .xlsx');
    }
}
