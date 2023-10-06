import List "mo:base/List";
import Debug "mo:base/Debug";


actor Dkeeper{

  public type Note={
    title:Text;
    content:Text;
  };

  stable var notes :List.List<Note> = List.nil<Note>();

  public func createNote(titleText: Text, contentText: Text){
    let newNote: Note={
      title=titleText;
      content=contentText;
    };
    notes:= List.push(newNote, notes);
    Debug.print(debug_show(notes));
  };

  public query func readNotes():async [Note]{
    Debug.print("fk");
     return List.toArray(notes);
  };

  public func delNote(id:Nat){
    let Listfront=List.take(notes,id); //taking first id elements
    let Listback=List.drop(notes,id+1); //dropping first id+1 elements
    notes:=List.append(Listfront,Listback);
    
  }

};