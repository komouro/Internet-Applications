# Internet-Applications

Ονοματεπώνυμο: Μουρογιάννης Κωνσταντίνος <br />
Αριθμός μητρώου: 03116056 <br />
Βίντεο παρουσίασης: https://www.youtube.com/watch?v=UttwZm3nLFo&feature=youtu.be&fbclid=IwAR2qTwzqR8s0RZ-bbZvs5GX4digrh0uabR_dIrtavPNAxG-YR_i8Eon2kno\

## Λειτουργική περιγραφή
Στο πλαίσιο του μαθήματος "Διαδίκτυο και Εφαρμογές" της σχολής ΗΜΜΥ υλοποιήθηκε ένα restful API για τη λήψη δεδομένων εισόδου και την εξαγωγή χρήσιμης πληροφορίας για το χρήστη μέσω της κατάλληλης επεξεργασίας δεδομένων που παρέχονται από web services. Η συγκεκριμένη εφαρμογή περιλαμβάνει τις εξής λειτουργικές υπηρεσίες:

1] Ο χρήστης εισάγει συντεταγμένες τοποθεσίας. Προσδιορίζονται οι m κοντινότερες στάσεις προς αυτή την τοποθεσία και επιστρέφονται τo id, το όνομα και οι συντεταγμένες κάθε στάσης. Το m ορίζεται δυναμικά μέσω κατάλληλης επιλογής από το χρήστη.

2] Ο χρήστης εισάγει τις συντεταγμένες της τοποθεσίας του και τις συντεταγμένες του προορισμού του. Προσδιορίζονται ο κοντινότερος σταθμός στην τοποθεσία του (σταθμός si) και ο κοντινότερος σταθμός στον προορισμό (σταθμός sj). Επιστρέφονται k διαδρομές (εφόσον υπάρχουν) που μπορούν να χρησιμοποιηθούν για τη μετάβαση από το σταθμό si στο σταθμό sj. Οι διαδρομές έχουν μορφή si->s1->s2->...->sj, όπου s1, s2,... είναι σταθμοί που μπορούν να χρησιμοποιηθούν ως ενδιάμεσες στάσεις στη διαδρομή. Ο χρήστης μαθαίνει επιπλέον για τη διαδρομή με το μικρότερο πλήθος ενδιάμεσων στάσεων. Το k ορίζεται δυναμικά μέσω κατάλληλης επιλογής από το χρήστη.

3] Από τα δεδομένα του καιρού ο χρήστης μπορεί να μάθει για τις λεωφορειακές γραμμές όπου στην αφετηρία τους δε βρέχει την τρέχουσα χρονική στιγμή. Συγκεκριμένα, μπορεί να μάθει για τις στάσεις που δεν έχουν βροχερές καιρικές συνθήκες και μπορούν να χρησιμοποιηθούν ως σταθμοί-αφετηρίες. Παράλληλα, μπορεί να μάθει για τις στάσεις που είναι προσβάσιμες μέσω σταθμών όπου δε βρέχει και μπορούν να χρησιμοποιηθούν ως σταθμοί-προορισμοί.

## Δομική περιγραφή
**Dataset**: Η εφαρμογή αξιοποιεί δεδομένα που παρέχονται από την itravel μέσω του api http://feed.opendata.imet.gr:23577/itravel και από το web service Web Service 11 (getCurrentTemperatureStartingPoint) που προτείνεται στα εργαλεία του Appathon@Ntua 2020. Ωστόσο, υπάρχουν και αποθηκευμένα στιγμιότυπα τέτοιων συνόλων δεδομένων στο directory Dataset προκειμένου να είναι εφικτή και η τοπική εξόρυξη δεδομένων. Τα δεδομένα αυτά μπορούν να ανανεώνονται χειροκίνητα από το διαχειριστή της εφαρμογής.<br />
**Back-end**: Για την εξόρυξη των δεδομένων είτε από τοπικά αρχεία είτε από web services, η εφαρμογή περιλαμβάνει έναν κεντρικό server (api). Η υλοποίηση του server βρίσκεται στο directory του Back-end. Ο server δέχεται τα αιτήματα του χρήστη, λαμβάνει τα δεδομένα (raw data) που χρειάζεται είτε από τοπικά είτε διαδικτυακά και τα επεξεργάζεται για να επιστρέψει το επιθυμητό αποτέλεσμα πίσω στο χρήστη. Η σύνθεση του Back-end πραγματοποιήθηκε με Node js.<br />
**Front-end και Cli**: Για την επικοινωνία του χρήστη με την εφαρμογή έχουν υλοποιηθεί ένα περιβάλλον front-end και ένα περιβάλλον cli. Το front-end βασίζεται σε ένα σύστημα αρχείων html, css και javascript. Συγκεκριμένα, χρησιμοποιήθηκε η εργαλειοθήκη της Angular js (https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js) και του jQuery (https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js). Το cli περιλαμβάνει κώδικα σε γλώσσα Python. Για τη σύσταση των αιτημάτων προς το Back-end χρησιμοποιήθηκε XMLHttpRequest από το Front-end και η βιβλιοθήκη requests από το cli. Για το parsing στο cli αξιοποιήθηκε η βιβλιοθήκη click.

## Οδηγίες εγκατάστασης - εκτέλεσης
Για την ομαλή λειτουργία της εφαρμογής, στο directory του Back-end εκτελούμε σε ένα command-line την εντολή:
```
npm install
```
Για την εκκίνηση του κεντρικού server της εφαρμογής, στο directory του Back-end εκτελούμε σε ένα command-line την εντολή:
```
npm run dev
```
Για την είσοδο στο περιβάλλον της διεπαφής cli, στο directory του Cli εκτελούμε σε ένα command-line την εντολή:
```
python Mouro_app.py
```
Για την είσοδο στο περιβάλλον του front-end, στο directory του Front-end/MouroAppHome ανοίγουμε με τη βοήθεια ενός broswer το αρχείο Home.html. Προτείνεται η χρήση του Google Chrome ή του Mozilla Firefox.

## Ενδεικτική εκτέλεση
Μες στο περιβάλλον του cli ο χρήστης μπορεί να βρει βοηθητικές πληροφορίες για τις βασικές διαθέσιμες εντολές μέσω της εντολής help. Για πιο αναλυτικές οδηγίες σχετικές με τη χρήση της εφαρμογής ο χρήστης μπορεί να πληκτρολογήσει την εντολή cli_Manual. Η είσοδος των παραμέτρων για τη δημουργία των αιτημάτων προς το server πραγματοποιείται με την εντολή Mouro_app, την οποία πρέπει να ακολουθεί το κατάλληλο αναγνωριστικό της αντίστοιχης λειτουργίας που επιθυμεί να χρησιμοποιήσει ο χρήστης και οι καλώς ορισμένες παραμετρικές τιμές. Ενδεικτικά, η ορθή μορφή των εντολών κάθε λειτουργίας φαίνεται παρακάτω:
```
Mouro_app NearestStations --lat lat --lon lon --num num (--service service)
Mouro_app ConnectionRoutes --lat_src lat_src --lon_src lon_src --lat_dst lat_dst --lon_dst lon_dst --num num (--service service)"
Mouro_app WeatherConditions (--stationtype stationtype) (--service service)
```
Ταυτόχρονα, ο χρήστης μπορεί να ζητήσει την κατάσταση λειτουργίας του server, δηλαδή να πραγματοποιήσει αίτημα επιβεβαίωσης για να ελέγξει αν ο server λειτουργεί ομαλά, μέσω της εντολής:
```
Mouro_app HealthCheck
```
Όσον αφορά το front-end, η αρχική σελίδα περιλαμβάνει ένα μενού επιλογής λειτουργίας που οδηγεί το χρήστη σε άλλη σελίδα. Εκεί ο χρήστης μπορεί να συμπληρώσει τις παραμετρικές τιμές του αιτήματος του. Αν αυτές είναι καλώς ορισμένες, τότε ο χρήστης μεταβιβάζεται σε νέα σελίδα όπου γίνεται η αποστολή του αιτήματος στο server και η εκτύπωση των αποτελεσμάτων σε μορφή πινάκων, συνοδευόμενη συχνά και από ένα επεξηγηματικό μήνυμα. Ο χρήστης εκεί μπορεί να επαναλάβει το αίτημα με το πάτημα ενός κουμπιού ώστε να λάβει τα τελευταία (updated) δεδομένα, να υποκρύψει τα αποτελέσματα και να επιστρέψει μέσω του μενού επιλογής λειτουργίας πίσω στη φόρμα συμπλήρωσης για να δώσει καινούριες παραμετρικές τιμές.
