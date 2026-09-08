import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:hive_flutter/hive_flutter.dart';

import 'app/app.dart';
import 'core/config/env.dart';

/// Hive box for the create-activity form draft.
const String _draftBoxName = 'wizard_draft';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Load environment variables
  await Env.load();

  await Firebase.initializeApp();
  await GoogleSignIn.instance.initialize();

  await Hive.initFlutter();
  await Hive.openBox(_draftBoxName);

  runApp(const ProviderScope(child: MatchUpApp()));
}
